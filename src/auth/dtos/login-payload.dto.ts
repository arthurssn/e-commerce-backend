import { UserEntity } from 'src/user/entities/user.entity';

export class LoginPayloadDto {
  sub: number;
  username: string;
  typeUser: number;

  constructor(user: UserEntity) {
    this.sub = user.id;
    this.username = user.name;
    this.typeUser = user.typeUser;
  }
}
