import { Controller, Post, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async auth(
    @Headers('authorization') authorization: string,
  ): Promise<{ token: string }> {
    return await this.authService.auth(authorization);
  }
}
