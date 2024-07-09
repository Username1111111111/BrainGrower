import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;
  let REPOSITORY_TOKEN =  getRepositoryToken(User);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: REPOSITORY_TOKEN,
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(REPOSITORY_TOKEN);
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('repository should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe("findAll", () => {
    it("should find all users", async () => {
      const mockUsers: User[] = [
        { id: 1, email: 'test1@example.com', name: 'User 1', signupDate: new Date(), lastLogin: new Date(), role: "user" } as User,
        { id: 2, email: 'test2@example.com', name: 'User 2', signupDate: new Date(), lastLogin: new Date(), role: "user" } as User,
      ];

      jest.spyOn(repository, 'find').mockResolvedValueOnce(mockUsers);

      const result = await service.findAll();
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe(1);
      expect(result[1].name).toBe('User 2');
    })
  })

  describe('findUser', () => {
    it('should return a single user', async () => {
      const mockUser = { id: 1, email: 'test1@example.com', name: 'User 1', signupDate: new Date(), lastLogin: new Date(), role: 'user' } as User;

      jest.spyOn(repository, 'findOneBy').mockResolvedValue(mockUser);

      const result = await service.findUser(1);
      expect(result.email).toBe('test1@example.com');
    });
  });

  describe('createUser', () => {
    it('should create and return a new user', async () => {
      const createUserDto: CreateUserDto = { email: 'create@example.com', name: 'User 1', password: 'testCreate' };
      const savedUser: User = { id: 1, ...createUserDto, signupDate: new Date(), lastLogin: new Date(), role: 'user' } as User;

      jest.spyOn(repository, 'create').mockReturnValue(savedUser);
      jest.spyOn(repository, 'save').mockResolvedValue(savedUser);

      const result = await service.createUser(createUserDto);
      expect(result.email).toBe('create@example.com');
    });
  });

  describe('updateUser', () => {
    it('should update and return the user', async () => {
      const updateUserDto: UpdateUserDto = { email: 'update@example.com', name: 'User 1', role: 'admin' };
      const updatedUser: User = { id: 1, ...updateUserDto, signupDate: new Date(), lastLogin: new Date(), password: 'password1' } as User;

      jest.spyOn(repository, 'update').mockResolvedValue({ affected: 1 } as UpdateResult);
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(updatedUser);

      const result = await service.updateUser(1, updateUserDto);
      expect(result.email).toBe('update@example.com');
    });
  });

  describe('deleteUser', () => {
    it('should delete the user', async () => {
      const deleteResult = { affected: 1, raw: {} };

      jest.spyOn(repository, 'delete').mockResolvedValue(deleteResult);

      const result = await service.deleteUser(1);
      expect(result.affected).toBe(1);
    });
  });
});
