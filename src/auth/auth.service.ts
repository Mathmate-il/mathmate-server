import { ConfigService } from '@nestjs/config';
import { NotFoundException } from '@nestjs/common/exceptions';
import { AuthDto } from './../dto/AuthDto';
import { OAuth2Client } from 'google-auth-library';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
);

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  async signUp(oAuthToken: string) {
    try {
      const { email, name } = await this.googleAuth(oAuthToken);
      const userDto = new AuthDto({ email, name });
      const user = await this.prisma.user.create({
        data: {
          ...userDto,
        },
      });
      return this.signToken(user.id, user.email);
    } catch (error) {
      throw new UnauthorizedException('User already exists');
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
