import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { HttpCode } from '@nestjs/common/decorators';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body('token') oAuthToken: string): Promise<unknown> {
    return await this.authService.auth(oAuthToken);
  }

  @HttpCode(200)
  @Post('signin')
  async signin(@Body('token') oAuthToken: string): Promise<unknown> {
    return await this.authService.auth(oAuthToken);
  }
}
