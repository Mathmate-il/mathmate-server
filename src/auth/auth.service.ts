import { AuthDto } from './dto/AuthDto';
import { ConfigService } from '@nestjs/config';
import { NotFoundException } from '@nestjs/common/exceptions';
import { OAuth2Client } from 'google-auth-library';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
);

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  async signUp(oAuthToken: string) {
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

        return this.signToken(user.id, user.email);
      }
      return this.signToken(userExist.id, userExist.email);
    } catch (error) {
      throw new UnauthorizedException('Unauthenticated');
    }
  }

  private async googleAuth(oAuthToken: string) {
    try {
      const ticket = await client.verifyIdToken({
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
    email: string,
  ): Promise<{ token: string }> {
    const payload = {
      id: userId,
      email,
    };

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '24h',
      secret: this.config.get('JWT_SECRET'),
    });

    return { token };
  }
}
