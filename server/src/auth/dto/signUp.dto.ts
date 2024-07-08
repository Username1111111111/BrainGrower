import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}