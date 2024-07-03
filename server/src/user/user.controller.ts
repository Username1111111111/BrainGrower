import { Controller, Body, Get, Post, Put, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';

@Controller('user')
export class UserController {

  constructor(private userService: UserService) { }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  updateUserById(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    this.userService.updateUserById(id, updateUserDto);
  }

  // @Delete(':id')
  // deleteUserById(@Param('id', ParseIntPipe) id: number) {}

}
