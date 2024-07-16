import {
  Controller,
  Body,
  Get,
  Post,
  Put,
  Delete,
  Param,
  ParseIntPipe,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { GetUserDto } from './dto/GetUser.dto';
import { AuthUserDto } from './dto/AuthUser.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { MESSAGE } from 'src/Message';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller('user')
@UseGuards(AuthGuard, RolesGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Get()
  @Roles('admin')
  findAll(): Promise<GetUserDto[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'user')
  async findUser(@Param('id', ParseIntPipe) id: number, @Request() req): Promise<GetUserDto> {
    const authUserId = req.user.id;

    if (req.user.role === 'admin' || id === authUserId) {
      return this.userService.findUser(id);
    } else {
      throw new Error(MESSAGE.UNAUTHORIZED_ACCESS);
    }
  }

  @Get('email/:email')
  @Roles('admin')
  findUserByEmail(@Param('email') email: string): Promise<AuthUserDto> {
    return this.userService.findUserByEmail(email);
  }

  @Post()
  @Roles('admin')
  createUser(@Body() createUserDto: CreateUserDto): Promise<GetUserDto> {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  @Roles('admin', 'user')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto): Promise<GetUserDto> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @Roles('admin')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }

  @Put(':id/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@Param('id', ParseIntPipe) id: number, @UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error('Missing required parameter - file [user.controller.ts]');
    }
    const imageUrl = await this.cloudinaryService.uploadImage(file);
    return this.userService.updateUser(id, { profileImage: imageUrl });
  }
}
