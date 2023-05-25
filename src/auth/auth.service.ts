import { Injectable, NotFoundException } from '@nestjs/common';
import { IAuthService } from './interfaces/auth-service.interface';
import { returnUserDto } from 'src/user/dtos/returnUser.dto';
import { LoginDto } from './dtos/login.dto';
import { IUserRepository } from 'src/user/interfaces/user-repository.interface';
import { compare } from 'bcrypt';
@Injectable()
export class AuthService implements IAuthService {
  constructor(private readonly userRepository: IUserRepository) {}
  async login(loginDto: LoginDto): Promise<returnUserDto> {
    const user = await this.userRepository.findUserByEmail(loginDto.email);
    const isMatch = await compare(loginDto.password, user?.password || '');

    if (!user && !isMatch)
      throw new NotFoundException('Email e/ou senha incorreto(s)!');

    return new returnUserDto(user);
  }
}
