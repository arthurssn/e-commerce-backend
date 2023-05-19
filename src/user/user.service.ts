import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { hash } from 'bcrypt';
import { IUserService } from './interfaces/user-service.interface';
import { IUserRepository } from './interfaces/user-repository.interface';
import { returnUserDto } from './dtos/returnUser.dto';
@Injectable()
export class UserService implements IUserService {
  constructor(private readonly userRepository: IUserRepository) {}
  async findAll(): Promise<returnUserDto[]> {
    const users = await this.userRepository.findAll();
    return users.map((user) => new returnUserDto(user));
  }

  async create(createUserDto: CreateUserDto): Promise<returnUserDto> {
    const passwordHashed = await this.hashingPassword(createUserDto.password);
    return this.userRepository.create({
      typeUser: 1,
      ...createUserDto,
      password: passwordHashed,
    });
  }

  private async hashingPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    const passwordHashed = await hash(password, saltOrRounds);
    return passwordHashed;
  }
}
