import { Controller, Post, Body } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { AuthService } from './auth.service';

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
);

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body('token') token): Promise<any> {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { email, name } = ticket.getPayload();
    const data = await this.authService.login({ email, name });
    return {
      data,
      message: 'success',
    };
  }
}
