import { returnUserDto } from 'src/user/dtos/returnUser.dto';
import { ReturnAddress } from '../../address/dtos/return-address.dto';
import { UserEntity } from 'src/user/entities/user.entity';

export class returnUserWithAddressesDto {
  user: returnUserDto;
  addresses: ReturnAddress[];

  constructor(userEntity: UserEntity) {
    this.user = new returnUserDto(userEntity);
    this.addresses = userEntity.addresses.map(
      (address) => new ReturnAddress(address),
    );
  }
}
