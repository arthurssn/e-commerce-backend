import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const passwordHashed = await this.hashingPassword(createUserDto.password);
    return this.userRepository.save({
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
