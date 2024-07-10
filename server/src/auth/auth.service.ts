import { Injectable, UnauthorizedException, ConflictException, BadRequestException  } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signUp.dto';
import { errorMessage } from 'src/errorMessages';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(email: string, plainTextPassword: string): Promise<{ access_token: string }> {
    const user = await this.userService.findUserByEmail(email);
    const validPassword = await bcrypt.compare(plainTextPassword, user.password);

    if (!user || !validPassword) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    const payload = { sub: result.id, email: result.email, name: result.name, role: result.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async singUp(signUpDto: SignUpDto): Promise<void> {
    const { email, password, confirmPassword, name } = signUpDto;

    if (password !== confirmPassword) {
      throw new BadRequestException(errorMessage.PASSWORDS_DONT_MATCH);
    }

    const existingUser = await this.userService.findUserByEmail(email);

    if (existingUser) {
      throw new ConflictException(errorMessage.USER_EXISTS);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await this.userService.createUser({ email, password: hashedPassword, name });
  }
}