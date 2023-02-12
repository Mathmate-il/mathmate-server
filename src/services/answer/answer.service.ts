import { AnswerRepository } from './../../repositories/entities/AnswerRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AnswerService {
  constructor(private readonly answerRepository: AnswerRepository) {}
}
