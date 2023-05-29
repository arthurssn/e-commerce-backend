import { Body, Controller, Post, ValidationPipe, Param } from '@nestjs/common';
import { IAddressCrud } from './interfaces/address-crud.interface';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { AddressEntity } from './entities/address.entity';
import { IAddressService } from './interfaces/address-service.interface';
import { UserId } from 'src/decorators/user-id.decorator';

@Controller('address')
export class AddressController implements IAddressCrud {
  constructor(private readonly addressService: IAddressService) {}

  @Post()
  async create(
    @Body(new ValidationPipe())
    createAddressDto: CreateAddressDto,
    @UserId()
    userId: number,
  ): Promise<AddressEntity> {
    return this.addressService.create(createAddressDto, userId);
  }
}
