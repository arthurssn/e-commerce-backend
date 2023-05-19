import { CreateAddressDto } from '../dtos/createAddress.dto';
import { AddressEntity } from '../entities/address.entity';

export abstract class IAddressCrud {
  abstract create(
    createAddressDto: CreateAddressDto,
    userId: number,
  ): Promise<AddressEntity>;
}
