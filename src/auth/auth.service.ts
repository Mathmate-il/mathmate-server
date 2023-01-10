import { AuthDto } from './dto/AuthDto';
import { NotFoundException } from '@nestjs/common/exceptions';
import { OAuth2Client } from 'google-auth-library';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../DAL/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AppConfigService } from '../config/config.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly config: AppConfigService,
    private readonly jwt: JwtService,
  ) {
    this.oAuthClient = new OAuth2Client(
      this.config.getConfig().google.clientId,
      this.config.getConfig().google.clientSecret,
    );
  }

  private oAuthClient: OAuth2Client;

  async auth(oAuthToken: string) {
    try {
      const { email, name } = await this.googleAuth(oAuthToken);
      const userDto = new AuthDto({ email, name });
      const userExist = await this.prismaService.user.findUnique({
        where: { email },
      });
      if (!userExist) {
        const user = await this.prismaService.user.create({
          data: {
            ...userDto,
          },
        });
        return this.signToken(user.id);
      }
      return this.signToken(userExist.id);
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

  private async signToken(userId: string): Promise<{ token: string }> {
    const payload = {
      id: userId,
    };
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '24h',
      secret: this.config.getConfig().jwt.secret,
    });

    return { token };
  }
}
