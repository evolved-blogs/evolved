import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { SignUpDto } from './dto/signup.dto';
import { ExceptionEnum } from '../common/enum/exceptions.enum';
import { ResponseEnum } from '../common/enum/response.enum';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ProfileService } from 'src/profile/profile.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
    private profile: ProfileService,
  ) {}

  logger = new Logger('AuthService');

  async hashData(password: string) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
  }

  async createUser(signupDto: SignUpDto) {
    const { email, password, userName } = signupDto || {};
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      throw new HttpException(
        ExceptionEnum.EmailAlreadyExists,
        HttpStatus.BAD_REQUEST,
      );
    }

    const hash = await this.hashData(password);
    const newUser = await this.prisma.user.create({
      data: {
        email,
        hash,
        userName,
      },
    });

    await this.profile.createProfile(newUser.userId);

    return {
      message: ResponseEnum.UserCreatedSuccessfully,
      user: {
        userId: newUser.userId,
        email: newUser.email,
        userName: newUser.userName ?? newUser.email,
      },
    };
  }

  async login(authDto: AuthDto) {
    const { email, password } = authDto || {};

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new HttpException(
        ExceptionEnum.UserNotFound,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!user.isGoogleAuth) {
      if (!user.hash) {
        throw new HttpException(
          ExceptionEnum.InvalidCredentials,
          HttpStatus.FORBIDDEN,
        );
      }

      const isMatchedPassword = await bcrypt.compare(password, user.hash);

      if (!isMatchedPassword) {
        this.logger.error('Invalid credentials');
        throw new HttpException(
          ExceptionEnum.InvalidCredentials,
          HttpStatus.FORBIDDEN,
        );
      }
    }

    const { access_token, refresh_token } = await this.getTokens(user);

    return {
      token: access_token,
      refresh_token: refresh_token,
      user: {
        userId: user.userId,
        email: user.email,
        userName: user.userName ?? user.email,
      },
    };
  }

  async getTokens({ userId, email }: { userId: string; email: string }) {
    const jwtPayload: { userId: string; email: string } = { userId, email };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('ACCESS_TOKEN_SECRET'),
        expiresIn: '1d',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('REFRESH_TOKEN_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    await this.prisma.user.update({
      where: { userId },
      data: { accessToken: access_token, refreshToken: refresh_token },
    });

    return { access_token, refresh_token };
  }
}
