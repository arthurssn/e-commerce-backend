import { Injectable } from '@nestjs/common';
import { IAddressRepository } from './interfaces/address-repository.interface';
import { IAddressService } from './interfaces/address-service.interface';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { AddressEntity } from './entities/address.entity';

@Injectable()
export class AddressService implements IAddressService {
  constructor(private readonly addressRepository: IAddressRepository) {}

  async create(
    createAddressDto: CreateAddressDto,
    userId: number,
  ): Promise<AddressEntity> {
    return await this.addressRepository.create(createAddressDto, userId);
  }
}
