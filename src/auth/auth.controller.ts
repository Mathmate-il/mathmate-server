import { Controller, Post, Body } from '@nestjs/common';
import { AuthDto } from 'src/dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body('token') oAuthToken: string): Promise<unknown> {
    return await this.authService.signUp(oAuthToken);
  }
}
