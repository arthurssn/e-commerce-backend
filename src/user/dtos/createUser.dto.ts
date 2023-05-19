import { IsString, IsEmail, IsInt } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  phone?: string;

  @IsString()
  cpf: string;

  @IsString()
  password: string;

  @IsInt()
  typeUser: number;
}
