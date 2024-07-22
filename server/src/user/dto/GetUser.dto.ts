import { IsEmail, IsString, IsNotEmpty, IsDate, IsNumber, IsOptional } from 'class-validator';

export class GetUserDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsDate()
  signupDate: Date;

  @IsNotEmpty()
  @IsDate()
  lastLogin: Date;

  @IsNotEmpty()
  @IsString()
  role: string;

  @IsOptional()
  @IsString()
  profileImage?: string;
}
