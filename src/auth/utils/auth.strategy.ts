import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { AppConfigService } from '../../config/config.service';

@Injectable({})
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: AppConfigService, private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.getConfig().jwt.secret,
    });
  }

  async validate(payload: {
    id: string;
    googleSub: string;
    oAuthToken: string;
  }) {
    const user = await this.authService.validateUser(
      payload.id,
      payload.googleSub,
      payload.oAuthToken,
    );

    return user;
  }
}
