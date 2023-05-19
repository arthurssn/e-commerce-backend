import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from './entities/address.entity';
import { Repository } from 'typeorm';
import { IAddressCrud } from './interfaces/address-crud.interface';
import { CreateAddressDto } from './dtos/createAddress.dto';

@Injectable()
export class AddressRepository implements IAddressCrud {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
  ) {}

  async create(
    createAddressDto: CreateAddressDto,
    userId: number,
  ): Promise<AddressEntity> {
    return this.addressRepository.save({
      ...createAddressDto,
      userId,
    });
  }
}
