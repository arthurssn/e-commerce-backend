import { CreateUserDto } from '../dtos/createUser.dto';
import { UserEntity } from '../entities/user.entity';

export abstract class IUserRepository {
  abstract findAll(): Promise<UserEntity[]>;
  abstract create(createUserDto: CreateUserDto): Promise<UserEntity>;
}
