import { IsEmail, IsString, IsNotEmpty, MinLength, IsOptional, IsDate } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  @IsString()
  email?: string;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  name?: string;

  @IsDate()
  @IsNotEmpty()
  @IsOptional()
  lastLogin?: Date;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  role?: string;

  @IsOptional()
  @IsString()
  profileImage?: string;
}
