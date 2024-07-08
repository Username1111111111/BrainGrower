import { Injectable, UnauthorizedException, ConflictException  } from '@nestjs/common';
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

  async signIn(email: string, plainTextPassword: string): Promise<{ access_token: string }> {
    const user = await this.userService.findUserByEmail(email);
    const samePassword = await bcrypt.compare(plainTextPassword, user.password);

    if (!user || !samePassword) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    const payload = { sub: result.id, email: result.email, name: result.name, role: result.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async singUp(signUpDto: SignUpDto): Promise<void> {
    const { email, password, name } = signUpDto;
    const existingUser = await this.userService.findUserByEmail(email);

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await this.userService.createUser({ email, password: hashedPassword, name });
  }
}