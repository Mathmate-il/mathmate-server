import { NotFoundException } from '@nestjs/common/exceptions';
import { UserRepository } from './../repositories/entities/UserRepository';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/UpdateUserDto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async updateUser(id: string, body: UpdateUserDto) {
    try {
      const user = await this.userRepository.findOne({ id });
      if (!user) {
        throw new NotFoundException(
          'User with this credentials has not been found',
        );
      }
      const updatedUser = await this.userRepository.update({
        where: { id },
        data: body,
      });
      return updatedUser;
    } catch (error) {
      throw new BadRequestException('Bad request');
    }
  }

  // Todo: Create the service for the creation of a new question. Hint -> use the QuestionRepository
}
