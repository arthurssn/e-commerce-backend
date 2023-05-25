import { returnUserDto } from 'src/user/dtos/returnUser.dto';
import { LoginDto } from '../dtos/login.dto';

export abstract class IAuth {
  abstract login(loginDto: LoginDto): Promise<returnUserDto>;
}
