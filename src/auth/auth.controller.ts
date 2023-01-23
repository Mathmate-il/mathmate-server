import { Controller, Post, Req } from '@nestjs/common';
import { ApiSecurity } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @ApiSecurity('oauth2')
  async auth(@Req() req: Request): Promise<{ token: string }> {
    const oAuthToken = req.headers['authorization'];
    return await this.authService.auth(oAuthToken);
  }
}
