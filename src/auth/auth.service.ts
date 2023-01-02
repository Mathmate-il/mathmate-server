import { AuthDto } from './../dto/AuthDto';
import { OAuth2Client } from 'google-auth-library';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
);

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async login(oAuthToken: string) {
    try {
      const ticket = await client.verifyIdToken({
        idToken: oAuthToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const { email, name } = ticket.getPayload();

      const user: AuthDto = await this.prisma.user.create({
        data: {
          name,
          email,
        },
      });
      const { name: userName, email: userEmail } = user;
      return {
        userName,
        userEmail,
        message: 'user created',
      };
    } catch (error) {
      throw new ForbiddenException('user already exists');
    }
  }
}
