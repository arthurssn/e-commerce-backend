import { CreateUserDto } from '../dtos/createUser.dto';
import { returnUserDto } from '../dtos/returnUser.dto';

export abstract class IUserCRUD {
  abstract findAll(): Promise<returnUserDto[]>;
  abstract create(createUserDto: CreateUserDto): Promise<returnUserDto>;
}
