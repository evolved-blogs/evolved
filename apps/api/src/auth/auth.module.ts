import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AccessTokenStrategy } from '../common/strategies/accessToken.strategy';
import { ProfileModule } from 'src/profile/profile.module';

@Module({
  imports: [PrismaModule, JwtModule, ConfigModule, ProfileModule],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy],
})
export class AuthModule {}
