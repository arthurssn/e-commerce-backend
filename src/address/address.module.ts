import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressEntity } from './entities/address.entity';
import { IAddressService } from './interfaces/address-service.interface';
import { IAddressRepository } from './interfaces/address-repository.interface';
import { AddressRepository } from './address.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AddressEntity])],
  controllers: [AddressController],
  providers: [
    {
      provide: IAddressService,
      useClass: AddressService,
    },
    {
      provide: IAddressRepository,
      useClass: AddressRepository,
    },
  ],
})
export class AddressModule {}
