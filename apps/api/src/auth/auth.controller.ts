import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/common/enum/decorators/public.decorator';
import { SignUpDto } from './dto/signup.dto';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('create-user')
  async creatUser(@Body() signUpDto: SignUpDto) {
    return this.authService.createUser(signUpDto);
  }

  @Public()
  @Post('login')
  async login(@Body() authDto: AuthDto) {
    return this.authService.login(authDto);
  }
}
