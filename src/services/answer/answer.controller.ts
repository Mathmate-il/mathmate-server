import { AnswerService } from './answer.service';
import { Controller } from '@nestjs/common';

@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}
}
