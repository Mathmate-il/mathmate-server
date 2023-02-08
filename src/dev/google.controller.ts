import config from '@/config/config.singleton';
import { Get, Controller, Render, Header } from '@nestjs/common';

@Controller('dev')
export class GoogleController {
  @Get('google/auth')
  @Render('google-auth')
  @Header('Cross-Origin-Opener-Policy', 'same-origin-allow-popups')
  root() {
    return { client: config.googleClientId };
  }
}
