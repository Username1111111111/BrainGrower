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

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.plainTextPassword);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async singUp(@Body() signUpDto: SignUpDto) {
    return this.authService.singUp(signUpDto);
  }
}
