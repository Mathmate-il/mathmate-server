import { JwtModule } from '@nestjs/jwt';
import { AppConfigModule } from '../../src/config/config.module';
import { PrismaModule } from '../../src/prisma/prisma.module';
import { RepositoriesModule } from './../../src/repositories/repositories.module';
import { JwtStrategy } from '../../src/services/auth/utils/auth.strategy';
import { AuthService } from '../../src/services/auth/auth.service';
import { UserService } from '../../src/services/user/user.service';
import { UserController } from '../../src/services/user/user.controller';
import { AuthController } from '../../src/services/auth/auth.controller';
import { Test } from '@nestjs/testing';

export const createTestingModule = async () => {
  return await Test.createTestingModule({
    controllers: [AuthController, UserController],
    providers: [AuthService, UserService, JwtStrategy],
    imports: [RepositoriesModule, PrismaModule, AppConfigModule, JwtModule],
  }).compile();
};
