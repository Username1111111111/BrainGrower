import { CreateUserDto } from './dto/CreateUser.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { GetUserDto } from './dto/GetUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async findAll(): Promise<GetUserDto[]> {
    const users = await this.userRepository.find();
    return users.map(user => {
      const { password, ...result } = user;
      return result as GetUserDto;
    });
  }

  async findUser(id: number): Promise<GetUserDto> {
    const user = await this.userRepository.findOneBy({ id });
    if (user) {
      const { password, ...result } = user;
      return result as GetUserDto;
    }
  }

  async createUser(createUserDto: CreateUserDto): Promise<GetUserDto> {
    const newUser = this.userRepository.create({
      ...createUserDto
    });
    const savedUser = await this.userRepository.save(newUser);
    if (savedUser) {
      const { password, ...result } = savedUser;
      return result as GetUserDto;
    }
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<GetUserDto> {
    await this.userRepository.update(id, updateUserDto);
    const updatedUser = await this.userRepository.findOneBy({ id });
    if (updatedUser) {
      const { password, ...result } = updatedUser;
      return result as GetUserDto;
    }
  }

  async deleteUser(id: number) {
    return this.userRepository.delete(id);
  }
}
