import { Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async auth(@Req() req: Request): Promise<{ token: string }> {
    const oAuthToken = req.headers['authorization'];
    return await this.authService.auth(oAuthToken);
  }
}
