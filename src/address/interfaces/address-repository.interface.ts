import { CreateAddressDto } from '../dtos/createAddress.dto';
import { AddressEntity } from '../entities/address.entity';
import { IAddressCrud } from './address-crud.interface';

export abstract class IAddressRepository extends IAddressCrud {}
