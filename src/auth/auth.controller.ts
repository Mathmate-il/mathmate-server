import { JwtGuard } from './utils/auth.guard';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { Get } from '@nestjs/common/decorators';
import { Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { GetUser } from './utils/getUser.decorator';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async auth(@Req() req: Request): Promise<{ token: string }> {
    const oAuthToken = req.headers['authorization'];
    return await this.authService.auth(oAuthToken);
  }

  @Get('/me')
  @UseGuards(JwtGuard)
  async getUser(@GetUser() user: User) {
    return user;
  }
}
