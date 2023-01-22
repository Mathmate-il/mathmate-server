import { JwtGuard } from './../auth/utils/auth.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/utils/getUser.decorator';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  async findOne(@GetUser() user: User): Promise<User> {
    return user;
  }
}
