import { Controller, Body, Get, Post, Put, Delete, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { GetUserDto } from './dto/GetUser.dto';
import { AuthUserDto } from './dto/AuthUser.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('user')
@UseGuards(AuthGuard, RolesGuard)
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Get()
  @Roles('admin')
  findAll(): Promise<GetUserDto[]> {
    return this.userService.findAll();
  }

  @Get(":id")
  @Roles('admin', 'user')
  findUser(@Param('id', ParseIntPipe) id: number): Promise<GetUserDto> {
    return this.userService.findUser(id);
  }

  @Get("email/:email")
  @Roles('admin', 'user')
  findUserByEmail(@Param('email') email: string): Promise<AuthUserDto> {
    return this.userService.findUserByEmail(email);
  }

  @Post()
  @Roles('admin', 'user')
  createUser(@Body() createUserDto: CreateUserDto): Promise<GetUserDto> {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  @Roles('admin', 'user')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto): Promise<GetUserDto> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @Roles('admin', 'user')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }

}
