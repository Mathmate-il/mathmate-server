import { Get, Controller, Render, Header } from '@nestjs/common';

@Controller('dev')
export class GoogleController {
  @Get('google/auth')
  @Render('google-auth')
  @Header('Cross-Origin-Opener-Policy', 'same-origin-allow-popups')
  root() {
    return { client: process.env.GOOGLE_CLIENT_ID };
  }

  @Get('google/return')
  @Render('google-return')
  returnAuth() {
    return 'Hello';
  }
}
