import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { returnUserDto } from 'src/user/dtos/returnUser.dto';
import { IAuth } from './interfaces/auth.interface';
import { IAuthService } from './interfaces/auth-service.interface';

@Controller('auth')
export class AuthController implements IAuth {
  constructor(private readonly authService: IAuthService) {}

  @Post()
  async login(
    @Body(new ValidationPipe()) loginDto: LoginDto,
  ): Promise<returnUserDto> {
    return await this.authService.login(loginDto);
  }
}
