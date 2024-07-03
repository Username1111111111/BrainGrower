import { IsEmail, IsString, IsNotEmpty, MinLength, IsOptional } from 'class-validator';

export class UpdateUserDto {

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsNotEmpty()
  @MinLength(6)
  password?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsNotEmpty()
  lastLogin?: Date;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  role?: string;
}