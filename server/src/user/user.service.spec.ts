import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { User } from './user.entity';
import { ActivityLogService } from '../activityLog/activityLog.service';
import { MESSAGE } from '../Message';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { Parser } from 'json2csv';
import { ActivityLog } from '../activityLog/activityLog.entity';

interface MockUser {
  id: number;
  email: string;
  password: string;
  name: string;
  signupDate: Date;
  lastLogin: Date;
  role: string;
  profileImage?: string;
  activityLogs: ActivityLog[];
}

const mockUsers: MockUser[] = [
  {
    id: 1,
    email: 'test@example.com',
    password: 'hashedpassword',
    name: 'Test User',
    signupDate: new Date(),
    lastLogin: new Date(),
    role: 'user',
    profileImage: 'http://cloudinary.com/image.jpg',
    activityLogs: [],
  },
];

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;
  let activityLogService: ActivityLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findAndCount: jest.fn().mockResolvedValue([mockUsers, 1]),
            findOneBy: jest.fn().mockResolvedValue(mockUsers[0]),
            create: jest.fn().mockReturnValue(mockUsers[0]),
            save: jest.fn().mockResolvedValue(mockUsers[0]),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: ActivityLogService,
          useValue: {
            logActivity: jest.fn(),
            exportActivityLogs: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
    activityLogService = module.get<ActivityLogService>(ActivityLogService);
  });

  it('should find all users', async () => {
    const result = await service.findAll(1, 10, '');
    expect(result.data).toEqual([
      expect.objectContaining({
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
        signupDate: expect.any(Date),
        lastLogin: expect.any(Date),
        role: 'user',
        profileImage: 'http://cloudinary.com/image.jpg',
      }),
    ]);
    expect(result.total).toBe(1);
  });

  it('should find a user by ID', async () => {
    const result = await service.findUser(1, false);
    expect(result).toEqual(
      expect.objectContaining({
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
        signupDate: expect.any(Date),
        lastLogin: expect.any(Date),
        role: 'user',
        profileImage: 'http://cloudinary.com/image.jpg',
      }),
    );
    expect(activityLogService.logActivity).toHaveBeenCalledWith(mockUsers[0], MESSAGE.USER_READ);
  });

  it('should find a user by email', async () => {
    const result = await service.findUserByEmail('test@example.com');
    expect(result).toEqual(
      expect.objectContaining({
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
        role: 'user',
        profileImage: 'http://cloudinary.com/image.jpg',
      }),
    );
  });

  it('should create a new user', async () => {
    const createUserDto: CreateUserDto = {
      email: 'newuser@example.com',
      password: 'password',
      name: 'New User',
    };
    const result = await service.createUser(createUserDto);
    expect(result).toEqual(
      expect.objectContaining({
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
        signupDate: expect.any(Date),
        lastLogin: expect.any(Date),
        role: 'user',
        profileImage: 'http://cloudinary.com/image.jpg',
      }),
    );
    expect(activityLogService.logActivity).toHaveBeenCalledWith(mockUsers[0], MESSAGE.USER_CREATED);
  });

  it('should update an existing user', async () => {
    const updateUserDto: UpdateUserDto = {
      name: 'Updated User',
      profileImage: 'http://cloudinary.com/updatedimage.jpg',
    };
    const result = await service.updateUser(1, updateUserDto);
    expect(result).toEqual(
      expect.objectContaining({
        id: 1,
        email: 'test@example.com',
        name: 'Updated User',
        signupDate: expect.any(Date),
        lastLogin: expect.any(Date),
        role: 'user',
        profileImage: 'http://cloudinary.com/updatedimage.jpg',
        activityLogs: [],
      }),
    );
    expect(activityLogService.logActivity).toHaveBeenCalledWith(mockUsers[0], MESSAGE.USER_IMAGE_UPDATED);
  });

  it('should delete a user', async () => {
    const result = await service.deleteUser(1);
    expect(repository.delete).toHaveBeenCalledWith(1);
    expect(activityLogService.logActivity).toHaveBeenCalledWith(mockUsers[0], MESSAGE.USER_DELETED);
  });

  it('should update the last login date of a user', async () => {
    await service.updateLastLogin(1);
    expect(repository.update).toHaveBeenCalledWith(1, { lastLogin: expect.any(Date) });
    expect(activityLogService.logActivity).toHaveBeenCalledWith(mockUsers[0], MESSAGE.USER_LOGGED_IN);
  });

  it('should export user data in JSON format', async () => {
    const result = await service.exportUserData(1, 'json');
    expect(result).toEqual(
      JSON.stringify(
        {
          id: 1,
          email: 'test@example.com',
          name: 'Test User',
          signupDate: expect.any(Date),
          lastLogin: expect.any(Date),
          role: 'user',
          profileImage: 'http://cloudinary.com/image.jpg',
          activityLogs: [],
        },
        null,
        2,
      ),
    );
  });

  it('should export user data in CSV format', async () => {
    const parser = new Parser();
    const csv = parser.parse({
      id: 1,
      email: 'test@example.com',
      name: 'Test User',
      signupDate: expect.any(Date),
      lastLogin: expect.any(Date),
      role: 'user',
      profileImage: 'http://cloudinary.com/image.jpg',
      activityLogs: [],
    });
    const result = await service.exportUserData(1, 'csv');
    expect(result).toEqual(csv);
  });
});
