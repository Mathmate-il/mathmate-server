import { UserRepository } from './../repositories/entities/UserRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
}
