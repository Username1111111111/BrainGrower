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
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Response } from 'express';
import { MESSAGE } from '../Message';

const mockJwtService = {
  sign: jest.fn(),
  verify: jest.fn(),
};

const mockCloudinaryService = {
  uploadImage: jest.fn().mockResolvedValue('http://cloudinary.com/image.jpg'),
};

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;
  let cloudinaryService: CloudinaryService;
  const REPOSITORY_TOKEN = getRepositoryToken(User);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        CloudinaryService,
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
        {
          provide: CloudinaryService,
          useValue: mockCloudinaryService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
    cloudinaryService = module.get<CloudinaryService>(CloudinaryService);
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

      jest.spyOn(userService, 'findAll').mockResolvedValue({ data: mockUsers, total: 2 });

      const result = await controller.findAll(1, 10, '');
      expect(result.data).toBe(mockUsers);
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

      const result = await controller.findUser(1, { user: { id: 1, role: 'user' } });
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

  describe('uploadImage', () => {
    it('should upload and update user image', async () => {
      const file = { buffer: Buffer.from('image content') } as Express.Multer.File;
      const mockUpdatedUser: GetUserDto = {
        id: 1,
        email: 'test1@example.com',
        name: 'User 1',
        profileImage: 'http://cloudinary.com/image.jpg',
        signupDate: new Date(),
        lastLogin: new Date(),
        role: 'user',
      } as GetUserDto;

      jest.spyOn(userService, 'updateUser').mockResolvedValue(mockUpdatedUser);

      const result = await controller.uploadImage(1, file);
      expect(result.profileImage).toBe('http://cloudinary.com/image.jpg');
    });
  });

  describe('exportUserData', () => {
    it('should export user data in JSON format', async () => {
      const mockUserData = JSON.stringify(
        {
          id: 1,
          email: 'test1@example.com',
          name: 'User 1',
          signupDate: new Date(),
          lastLogin: new Date(),
          role: 'user',
          activityLog: {},
        },
        null,
        2,
      );

      jest.spyOn(userService, 'exportUserData').mockResolvedValue(mockUserData);

      const res = {
        setHeader: jest.fn(),
        send: jest.fn(),
      } as unknown as Response;

      await controller.exportUserData(1, 'json', res);
      expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
      expect(res.send).toHaveBeenCalledWith(mockUserData);
    });

    it('should export user data in CSV format', async () => {
      const mockUserData =
        'id,email,name,signupDate,lastLogin,role\n1,test1@example.com,User 1,2021-01-01,2021-01-01,user\n';

      jest.spyOn(userService, 'exportUserData').mockResolvedValue(mockUserData);

      const res = {
        setHeader: jest.fn(),
        send: jest.fn(),
      } as unknown as Response;

      await controller.exportUserData(1, 'csv', res);
      expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'text/csv');
      expect(res.send).toHaveBeenCalledWith(mockUserData);
    });
  });
});
