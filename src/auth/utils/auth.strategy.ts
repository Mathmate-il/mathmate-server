import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../DAL/prisma/prisma.service';
import { AppConfigService } from '../config/config.service';

@Injectable({})
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: AppConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.getConfig().jwt.secret,
    });
  }

  async validate(payload: { id: string; email: string }) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.id,
      },
    });
    return user;
  }
}
