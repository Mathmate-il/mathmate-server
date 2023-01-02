import { Controller, Post, Body } from '@nestjs/common';
import { AuthDto } from 'src/dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body('token') oAuthToken: string): Promise<AuthDto> {
    return await this.authService.login(oAuthToken);
  }
}
