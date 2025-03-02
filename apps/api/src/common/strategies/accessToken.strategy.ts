import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('ACCESS_TOKEN_SECRET') || '',
    });
  }

  async validate(payload: { email: string }): Promise<{ email: string }> {
    if (
      !payload ||
      typeof payload !== 'object' ||
      typeof payload.email !== 'string'
    ) {
      throw new UnauthorizedException();
    }
    if (!payload || typeof payload.email !== 'string') {
      throw new UnauthorizedException();
    }
    const user = await this.prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });

    if (!user) {
      throw new UnauthorizedException();
    }
    if (!user.accessToken) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}
