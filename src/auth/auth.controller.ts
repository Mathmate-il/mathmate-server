import { Controller, Post, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @ApiSecurity('oauth2')
  async auth(@Req() req: Request): Promise<{ token: string }> {
    const clientCredentials = req.headers['authorization'];
    return await this.authService.auth(clientCredentials);
  }
}
