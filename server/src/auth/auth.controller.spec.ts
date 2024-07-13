import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { SignUpDto } from './dto/signUp.dto';
import { MESSAGE } from '../Message';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signIn: jest.fn(),
            signUp: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signIn', () => {
    it('should return an access token and role', async () => {
      const signInDto: SignInDto = { email: 'test@example.com', plainTextPassword: 'test123' };
      const mockResult = { access_token: 'mockToken', role: 'user', message: MESSAGE.LOGIN_SUCCESSFUL };

      jest.spyOn(authService, 'signIn').mockResolvedValue({ access_token: 'mockToken', role: 'user' });

      const result = await controller.signIn(signInDto);
      expect(result).toEqual(mockResult);
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
      const mockResult = { role: 'user', message: MESSAGE.USER_CREATED_SUCCESSFULLY };

      jest.spyOn(authService, 'signUp').mockResolvedValue({ role: 'user' });

      const result = await controller.signUp(signUpDto);
      expect(result).toEqual(mockResult);
    });
  });
});
