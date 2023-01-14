import { UserRepository } from './UserRepository';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [UserRepository],
  exports: [UserRepository],
})
export class RepositoriesModule {}
