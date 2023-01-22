import { JwtGuard } from './../auth/utils/auth.guard';
import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/utils/getUser.decorator';
import { UserDto } from './dto/UserDto';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  async findOne(@GetUser() user: UserDto): Promise<UserDto> {
    return user;
  }
}
