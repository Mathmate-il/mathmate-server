import { JwtGuard } from './../auth/utils/auth.guard';
import { Body, Controller, Get, UseGuards, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUser } from 'src/auth/utils/getUser.decorator';
import { UserDto } from './dto/UserDto';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { User } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  async findOne(@GetUser() user: UserDto): Promise<UserDto> {
    return user;
  }

  @Patch('/me/update')
  async updateOne(
    @GetUser() user: UserDto,
    @Body() body: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(user.id, body);
  }

  // Todo: Create question with the user id, Hint -> use the @GetUser()
}
