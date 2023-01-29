import { TagRepository } from './../repositories/entities/TagRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TagService {
  constructor(private readonly tagRepository: TagRepository) {}

  async getAllTags() {
    return await this.tagRepository.findMany({});
  }
}
