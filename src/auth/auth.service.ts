import { UserRepository } from '../repositories/UserRepository';
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
    oAuthToken: string,
  ) {
    try {
      const { sub } = await this.googleAuth(oAuthToken);
      if (sub !== userGoogleSub) {
        throw new UnauthorizedException('Unauthorized');
      }

      const user = await this.userRepository.findUserByUniqueInput({
        id: userId,
      });
      if (user) return user;

      throw new NotFoundException('User does not exist');
    } catch (error) {
      throw new BadRequestException('Bad request');
    }
  }

  public async auth(oAuthToken: string) {
    try {
      const { email, name, sub } = await this.googleAuth(oAuthToken);

      const user = await this.userRepository.findUserByUniqueInput({
        email: email,
      });

      if (!user) {
        const newUser = await this.userRepository.createUser({ email, name });
        return this.signToken(newUser.id, sub, oAuthToken);
      }

      return this.signToken(user.id, sub, oAuthToken);
    } catch (error) {
      throw new UnauthorizedException('Unauthenticated');
    }
  }

  private async googleAuth(oAuthToken: string) {
    try {
      const ticket = await this.oAuthClient.verifyIdToken({
        idToken: oAuthToken,
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
    oAuthToken: string,
  ): Promise<{ token: string }> {
    const payload = {
      id: userId,
      googleSub,
      oAuthToken,
    };
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '24h',
      secret: this.config.getConfig().jwt.secret,
    });

    return { token };
  }
}
