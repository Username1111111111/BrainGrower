import { Controller, Body, Get, Post, Put, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { GetUserDto } from './dto/GetUser.dto';

@Controller('user')
export class UserController {

  constructor(private userService: UserService) { }

  @Get()
  findAll(): Promise<GetUserDto[]> {
    return this.userService.findAll();
  }

  @Get(":id")
  findUser(@Param('id', ParseIntPipe) id: number): Promise<GetUserDto> {
    return this.userService.findUser(id);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<GetUserDto> {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto): Promise<GetUserDto> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }

}
