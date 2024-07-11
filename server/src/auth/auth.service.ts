import { MESSAGE } from './../Message';
import { Injectable, UnauthorizedException, ConflictException, BadRequestException  } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signUp.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(email: string, plainTextPassword: string): Promise<{ access_token: string, role: string }> {
    const user = await this.userService.findUserByEmail(email);
    const validPassword = await bcrypt.compare(plainTextPassword, user.password);

    if (!user || !validPassword) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    const payload = { sub: result.id, email: result.email, name: result.name, role: result.role };
    const access_token = await this.jwtService.signAsync(payload);

    return {
      access_token,
      role: result.role
    };
  }

  async signUp(signUpDto: SignUpDto): Promise<{ role: string }> {
    const { email, password, confirmPassword, name } = signUpDto;

    if (password !== confirmPassword) {
      throw new BadRequestException(MESSAGE.PASSWORDS_DONT_MATCH);
    }

    const existingUser = await this.userService.findUserByEmail(email);

    if (existingUser) {
      throw new ConflictException(MESSAGE.USER_EXISTS);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userService.createUser({ email, password: hashedPassword, name });

    return { role: newUser.role };
  }
}