import { OAuth2Client } from 'google-auth-library';
import { Injectable } from '@nestjs/common';
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
      return {
        userData: { email, name },
        message: 'success',
      };
    } catch (error) {}
  }
}
