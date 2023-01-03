import { AuthDto } from './../dto/AuthDto';
import { OAuth2Client } from 'google-auth-library';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
);

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signUp(oAuthToken: string) {
    try {
      const { email, name } = await this.googleAuth(oAuthToken);
      const userDto = new AuthDto({ email, name });
      const user = await this.prisma.user.create({
        data: {
          ...userDto,
        },
      });
      return user;
    } catch (error) {
      throw new UnauthorizedException('User already exists');
    }
  }

  async googleAuth(oAuthToken: string) {
    try {
      const ticket = await client.verifyIdToken({
        idToken: oAuthToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      return ticket.getPayload();
    } catch (error) {
      throw new UnauthorizedException('Google did not found a user');
    }
  }

  async authenticateUser() {}
}
