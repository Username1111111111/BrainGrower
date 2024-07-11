import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { SignUpDto } from './dto/signUp.dto';
import { MESSAGE } from 'src/Message';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SignInDto) {
    const { access_token, role } = await this.authService.signIn(signInDto.email, signInDto.plainTextPassword);
    return { access_token, role, message: MESSAGE.LOGIN_SUCCESSFUL };
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    const { role } = await this.authService.signUp(signUpDto);
    return { role, message: MESSAGE.USER_CREATED_SUCCESSFULLY };
  }
}
