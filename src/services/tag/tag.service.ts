import { NotFoundException } from '@nestjs/common/exceptions';
import { ServerError } from '../../helpers/Errors.enums';
import { Injectable, BadRequestException } from '@nestjs/common';
import { TagRepository } from '@/repositories/entities/TagRepository';

@Injectable()
export class TagService {
  constructor(private readonly tagRepository: TagRepository) {}

  async getAllTags() {
    try {
      const tags = await this.tagRepository.findMany({});
      if (!tags) {
        throw new NotFoundException(ServerError.NotFound);
      }
      return tags;
    } catch (error) {
      throw new BadRequestException(ServerError.BadRequest);
    }
  }
}
