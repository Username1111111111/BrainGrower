import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  confirmPassword: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}