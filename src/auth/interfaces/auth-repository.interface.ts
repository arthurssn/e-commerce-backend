import { LoginDto } from '../dtos/login.dto';
import { IAuth } from './auth.interface';
import { UserEntity } from 'src/user/entities/user.entity';

export abstract class IAuthRepository extends IAuth {
  abstract login(loginDto: LoginDto): Promise<UserEntity>;
}
