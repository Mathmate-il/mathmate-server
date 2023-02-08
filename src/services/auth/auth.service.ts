import { UserRepository } from '@/repositories/entities/UserRepository';
import { ServerError } from '../../helpers/Errors.enums';
import { NotFoundException } from '@nestjs/common/exceptions';
import { OAuth2Client } from 'google-auth-library';
import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import config from '@/config/config.singleton';

@Injectable()
export class AuthService {
  private oAuthClient: OAuth2Client;
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwt: JwtService,
  ) {
    this.oAuthClient = new OAuth2Client(
      config.googleClientId,
      config.googleSecret,
    );
  }

  public async validateUser(userId: string) {
    try {
      const user = await this.userRepository.findOne({
        id: userId,
      });
      if (user) return user;

      throw new NotFoundException(ServerError.NotFound);
    } catch (error) {
      throw new BadRequestException(ServerError.NotFound);
    }
  }

  public async auth(clientCredentials: string) {
    try {
      const { email, name, picture } = await this.googleAuth(clientCredentials);
      const user = await this.userRepository.findOne({
        email: email,
      });

      if (!user) {
        const newUser = await this.userRepository.create({
          email,
          name,
          image: picture,
        });
        return this.signToken(newUser.id);
      }

      return this.signToken(user.id);
    } catch (error) {
      throw new UnauthorizedException(ServerError.Unauthorized);
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
      throw new NotFoundException(ServerError.NotFound);
    }
  }

  private async signToken(userId: string): Promise<{ token: string }> {
    const payload = {
      id: userId,
    };
    const token = await this.jwt.signAsync(payload, {
      secret: config.jwtSecret,
    });

    return { token };
  }
}
