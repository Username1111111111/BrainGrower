import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { GetUserDto } from './dto/GetUser.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '../auth/guard/auth.guard';

const mockJwtService = {
  sign: jest.fn(),
  verify: jest.fn(),
};

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;
  const REPOSITORY_TOKEN = getRepositoryToken(User);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: REPOSITORY_TOKEN,
          useClass: Repository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: AuthGuard,
          useValue: {
            canActivate: jest.fn(() => true),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const mockUsers: GetUserDto[] = [
        {
          id: 1,
          email: 'test1@example.com',
          name: 'User 1',
          signupDate: new Date(),
          lastLogin: new Date(),
          role: 'user',
        },
        {
          id: 2,
          email: 'test2@example.com',
          name: 'User 2',
          signupDate: new Date(),
          lastLogin: new Date(),
          role: 'user',
        },
      ];

      jest.spyOn(userService, 'findAll').mockResolvedValue(mockUsers);

      const result = await controller.findAll();
      expect(result).toBe(mockUsers);
    });
  });

  describe('findUser', () => {
    it('should return a single user', async () => {
      const mockUser: GetUserDto = {
        id: 1,
        email: 'test1@example.com',
        name: 'User 1',
        signupDate: new Date(),
        lastLogin: new Date(),
        role: 'user',
      };

      jest.spyOn(userService, 'findUser').mockResolvedValue(mockUser);

      const result = await controller.findUser(1);
      expect(result).toBe(mockUser);
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = { email: 'create@example.com', name: 'User 1', password: 'testCreate' };
      const savedUser: GetUserDto = {
        id: 1,
        ...createUserDto,
        signupDate: new Date(),
        lastLogin: new Date(),
        role: 'user',
      };

      jest.spyOn(userService, 'createUser').mockImplementation(async () => {
        return { ...savedUser } as GetUserDto;
      });

      const result = await controller.createUser(createUserDto);
      expect(result.email).toBe('create@example.com');
    });
  });

  describe('updateUser', () => {
    it('should update and return the user', async () => {
      const updateUserDto: UpdateUserDto = { email: 'update@example.com', name: 'User 1', role: 'admin' };
      const mockUpdatedUser: GetUserDto = {
        id: 1,
        ...updateUserDto,
        signupDate: new Date(),
        lastLogin: new Date(),
        role: 'admin',
      } as GetUserDto;

      jest.spyOn(userService, 'updateUser').mockResolvedValue(mockUpdatedUser);

      const result = await controller.updateUser(1, updateUserDto);
      expect(result.email).toBe('update@example.com');
    });
  });

  describe('deleteUser', () => {
    it('should delete the user', async () => {
      const deleteResult = { affected: 1, raw: {} };
      jest.spyOn(userService, 'deleteUser').mockResolvedValue(deleteResult);

      const result = await controller.deleteUser(1);
      expect(result).toEqual(deleteResult);
    });
  });
});
