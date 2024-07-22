import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/signUp.dto';
import { AuthUserDto } from '../user/dto/AuthUser.dto';
import { GetUserDto } from '../user/dto/getUser.dto';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findUserByEmail: jest.fn(),
            createUser: jest.fn(),
            updateLastLogin: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signIn', () => {
    it('should return access token and role on successful sign in', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        plainTextPassword: 'hashedPassword',
        role: 'user',
        name: 'Test User',
      } as AuthUserDto;
      const mockToken = 'mockToken';

      jest.spyOn(userService, 'findUserByEmail').mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue(mockToken);
      jest.spyOn(userService, 'updateLastLogin').mockResolvedValue();

      const result = await service.signIn('test@example.com', 'plainTextPassword');
      expect(result).toEqual({ access_token: mockToken, role: 'user' });
    });

    it('should throw UnauthorizedException if user not found or invalid password', async () => {
      jest.spyOn(userService, 'findUserByEmail').mockResolvedValue(null);

      await expect(service.signIn('test@example.com', 'plainTextPassword')).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('signUp', () => {
    it('should create a new user and return the role', async () => {
      const signUpDto: SignUpDto = {
        email: 'test@example.com',
        password: 'test123',
        confirmPassword: 'test123',
        name: 'Test User',
      };
      const mockUser: GetUserDto = {
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
        role: 'user',
        signupDate: new Date(),
        lastLogin: new Date(),
      };

      jest.spyOn(userService, 'findUserByEmail').mockResolvedValue(null);
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword');
      jest.spyOn(userService, 'createUser').mockResolvedValue(mockUser);

      const result = await service.signUp(signUpDto);
      expect(result).toEqual({ role: 'user' });
    });

    it('should throw ConflictException if user already exists', async () => {
      jest.spyOn(userService, 'findUserByEmail').mockResolvedValue({} as AuthUserDto);

      const signUpDto: SignUpDto = {
        email: 'test@example.com',
        password: 'test123',
        confirmPassword: 'test123',
        name: 'Test User',
      };
      await expect(service.signUp(signUpDto)).rejects.toThrow(ConflictException);
    });

    it('should throw BadRequestException if passwords do not match', async () => {
      const signUpDto: SignUpDto = {
        email: 'test@example.com',
        password: 'test123',
        confirmPassword: 'test124',
        name: 'Test User',
      };

      await expect(service.signUp(signUpDto)).rejects.toThrow(BadRequestException);
    });
  });
});
