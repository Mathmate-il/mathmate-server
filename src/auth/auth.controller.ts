import {
  Controller,
  Post,
  Body,
  Request,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthDto } from 'src/dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body('token') oAuthToken: string): Promise<AuthDto> {
    return await this.authService.signUp(oAuthToken);
  }

  @Get('getUser')
  async getUser(@Request() req) {
    return req.user;
  }
}
