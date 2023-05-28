import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { IUserRepository } from 'src/user/interfaces/user-repository.interface';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginPayloadDto } from './dtos/login-payload.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}
  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findUserByEmail(loginDto.email);
    const isMatch = await compare(loginDto.password, user?.password || '');

    if (!user && !isMatch)
      throw new NotFoundException('Email e/ou senha incorreto(s)!');

    const payload = new LoginPayloadDto(user);

    return {
      user,
      authorization: await this.jwtService.signAsync({ ...payload }),
    };
  }
}
