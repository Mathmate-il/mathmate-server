import { UserRepository } from '../repositories/entities/UserRepository';
import { AppConfigService } from '../config/config.service';
import { NotFoundException } from '@nestjs/common/exceptions';
import { OAuth2Client } from 'google-auth-library';
import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private oAuthClient: OAuth2Client;
  constructor(
    private readonly userRepository: UserRepository,
    private readonly config: AppConfigService,
    private readonly jwt: JwtService,
  ) {
    this.oAuthClient = new OAuth2Client(
      this.config.getConfig().google.clientId,
      this.config.getConfig().google.clientSecret,
    );
  }

  public async validateUser(
    userId: string,
    userGoogleSub: string,
    clientCredentials: string,
  ) {
    try {
      const { sub } = await this.googleAuth(clientCredentials);
      if (sub !== userGoogleSub) {
        throw new UnauthorizedException('Unauthorized');
      }

      const user = await this.userRepository.findOne({
        id: userId,
      });
      if (user) return user;

      throw new NotFoundException('User does not exist');
    } catch (error) {
      throw new BadRequestException('Bad request');
    }
  }

  public async auth(clientCredentials: string) {
    try {
      const { email, name, picture, sub } = await this.googleAuth(
        clientCredentials,
      );
      const user = await this.userRepository.findOne({
        email: email,
      });

      if (!user) {
        const newUser = await this.userRepository.create({
          email,
          name,
          image: picture,
        });
        return this.signToken(newUser.id, sub, clientCredentials);
      }

      return this.signToken(user.id, sub, clientCredentials);
    } catch (error) {
      throw new UnauthorizedException('Unauthenticated');
    }
  }

  private async googleAuth(clientCredentials: string) {
    try {
      const ticket = await this.oAuthClient.verifyIdToken({
        idToken: clientCredentials,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      return ticket.getPayload();
    } catch (error) {
      throw new NotFoundException('Google did not found a user');
    }
  }

  private async signToken(
    userId: string,
    googleSub: string,
    clientCredentials: string,
  ): Promise<{ token: string }> {
    const payload = {
      id: userId,
      googleSub,
      clientCredentials,
    };
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '24h',
      secret: this.config.getConfig().jwt.secret,
    });

    return { token };
  }
}
