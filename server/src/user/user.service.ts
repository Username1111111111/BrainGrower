import { CreateUserDto } from './dto/CreateUser.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/UpdateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // async findUserById(id: number): Promise<User> {
  //   return this.userRepository.findOne(id);
  // }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create({
      ...createUserDto
    });
    return this.userRepository.save(newUser);
  }

  async updateUserById(id: number, updateUserDto: UpdateUserDto) {
    // const updatedUser = this.userRepository.create({
    //   ...updateUserDto
    // });
    return this.userRepository.update({id}, updateUserDto);
  }
}
