import { GetUser } from './../auth/utils/getUser.decorator';
import { JwtGuard } from './../auth/utils/auth.guard';
import { Body, Controller, Get, UseGuards, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/UserDto';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { User, Question } from '@prisma/client';
import { CreateQuestionDto } from 'src/question/dto/CreateQuestionDto';

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

  @Post('/me/create-question')
  async createQuestion(
    @GetUser() user: UserDto,
    @Body() body: CreateQuestionDto,
  ): Promise<Question> {
    return this.userService.createQuestion(user.id, body);
  }
}
