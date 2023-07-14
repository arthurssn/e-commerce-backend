import { CreateUserDto } from 'src/user/dtos/createUser.dto';
import { returnUserDto } from 'src/user/dtos/returnUser.dto';
import { UserEntity } from 'src/user/entities/user.entity';

export const createUserDto: CreateUserDto = {
  name: 'Arthur',
  cpf: '123.123.123-12',
  email: 'arthurnovaes@example.com',
  password: '123456',
  typeUser: 1,
};

export const userEntityMock: UserEntity = {
  name: 'Arthur',
  cpf: '123.123.123-12',
  email: 'arthurnovaes@example.com',
  password: '123456',
  typeUser: 1,
  id: 1,
  addresses: [],
};

export const returnUserDtoMock: returnUserDto = {
  id: 1,
  name: 'Arthur',
  cpf: '123.123.123-12',
  email: 'arthurnovaes@example.com',
};
