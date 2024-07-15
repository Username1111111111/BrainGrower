import { MESSAGE } from './../Message';
import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signUp.dto';
import * as bcrypt from 'bcrypt';

interface LoginResponse {
  id: number;
  name: string;
  role: string;
  access_token: string;
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, plainTextPassword: string): Promise<LoginResponse> {
    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const validPassword = await bcrypt.compare(plainTextPassword, user.password);

    if (!validPassword) {
      throw new UnauthorizedException();
    }

    await this.userService.updateLastLogin(user.id);

    const { password, ...result } = user;
    const payload = { sub: result.id, id: result.id, email: result.email, name: result.name, role: result.role };
    const access_token = await this.jwtService.signAsync(payload);

    return {
      id: result.id,
      name: result.name,
      role: result.role,
      access_token,
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
