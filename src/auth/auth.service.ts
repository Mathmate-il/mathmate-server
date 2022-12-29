import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async login({ email, name }) {
    return { email, name };
  }
  async test() {
    return 'Hello';
  }
}
