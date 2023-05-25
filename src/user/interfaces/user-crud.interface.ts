import { returnUserWithAddressesDto } from 'src/user/dtos/return-user-with-addresses.dto';
import { CreateUserDto } from '../dtos/createUser.dto';
import { returnUserDto } from '../dtos/returnUser.dto';

export abstract class IUserCRUD {
  abstract findAll(): Promise<returnUserDto[]>;
  abstract create(createUserDto: CreateUserDto): Promise<returnUserDto>;
  abstract findById(userId: number): Promise<returnUserDto>;
  abstract findUserWithAddresses(
    userId: number,
  ): Promise<returnUserWithAddressesDto>;
}
