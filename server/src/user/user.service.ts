import { CreateUserDto } from './dto/CreateUser.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { GetUserDto } from './dto/GetUser.dto';
import { AuthUserDto } from './dto/AuthUser.dto';
import { ActivityLogService } from '../activityLog/activityLog.service';
import { MESSAGE } from '../Message';
import { Parser } from 'json2csv';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private activityLogService: ActivityLogService,
  ) {}

  async findAll(page: number, limit: number, search: string): Promise<{ data: GetUserDto[]; total: number }> {
    const [users, total] = await this.userRepository.findAndCount({
      where: [{ name: Like(`%${search}%`) }, { email: Like(`%${search}%`) }],
      skip: (page - 1) * limit,
      take: limit,
    });

    const result = users.map((user) => {
      const { password, ...userData } = user;
      return userData as GetUserDto;
    });

    return { data: result, total };
  }

  async findUser(id: number, isAdmin: boolean): Promise<GetUserDto> {
    const user = await this.userRepository.findOneBy({ id });
    if (user) {
      const { password, ...result } = user;
      if (!isAdmin) {
        await this.activityLogService.logActivity(user, MESSAGE.USER_READ);
      }
      return result as GetUserDto;
    }
  }

  async findUserByEmail(email: string): Promise<AuthUserDto> {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      const { signupDate, lastLogin, ...result } = user;
      return result as AuthUserDto;
    }
  }

  async createUser(createUserDto: CreateUserDto): Promise<GetUserDto> {
    const newUser = this.userRepository.create({
      ...createUserDto,
    });
    const savedUser = await this.userRepository.save(newUser);
    if (savedUser) {
      const { password, ...result } = savedUser;
      await this.activityLogService.logActivity(savedUser, MESSAGE.USER_CREATED);
      return result as GetUserDto;
    }
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<GetUserDto> {
    const existingUser = await this.userRepository.findOneBy({ id });
    if (!existingUser) {
      return;
    }
    const isImageUpdate = updateUserDto.profileImage && updateUserDto.profileImage !== existingUser.profileImage;

    await this.userRepository.update(id, updateUserDto);
    const updatedUser = await this.userRepository.findOneBy({ id });
    if (updatedUser) {
      const { password, ...result } = updatedUser;
      if (isImageUpdate) {
        await this.activityLogService.logActivity(updatedUser, MESSAGE.USER_IMAGE_UPDATED);
      } else {
        await this.activityLogService.logActivity(updatedUser, MESSAGE.USER_UPDATED);
      }
      return result as GetUserDto;
    }
  }

  async deleteUser(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    await this.userRepository.delete(id);
    if (user) {
      await this.activityLogService.logActivity(user, MESSAGE.USER_DELETED);
    }
  }

  async updateLastLogin(id: number): Promise<void> {
    await this.userRepository.update(id, { lastLogin: new Date() });
    const user = await this.userRepository.findOneBy({ id });
    if (user) {
      await this.activityLogService.logActivity(user, MESSAGE.USER_LOGGED_IN);
    }
  }

  async exportUserData(userId: number, format: string): Promise<string> {
    const user = await this.userRepository.findOneBy({ id: userId });
    const userActivity = await this.activityLogService.exportActivityLogs(userId);

    if (!user) {
      throw new Error(MESSAGE.USER_NOT_FOUND);
    }

    const { password, ...userData } = user;
    const exportData = { ...userData, activityLog: { ...userActivity } };

    if (format === 'csv') {
      const parser = new Parser();
      return parser.parse(exportData);
    }

    return JSON.stringify(exportData, null, 2);
  }
}
