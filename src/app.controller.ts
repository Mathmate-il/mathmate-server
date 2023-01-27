import { Get, Controller, Render, Header } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('index')
  @Render('index')
  @Header('Cross-Origin-Opener-Policy', 'same-origin-allow-popups')
  root() {
    return { client: process.env.GOOGLE_CLIENT_ID };
  }
}
