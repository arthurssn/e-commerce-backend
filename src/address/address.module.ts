import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressEntity } from './entities/address.entity';
import { IAddressService } from './interfaces/address-service.interface';
import { IAddressRepository } from './interfaces/address-repository.interface';
import { AddressRepository } from './address.repository';
import { IUserRepository } from 'src/user/interfaces/user-repository.interface';
import { UserRepository } from 'src/user/user.repository';
import { UserEntity } from 'src/user/entities/user.entity';
import { ICityRepository } from 'src/city/interfaces/city-repository.interface';
import { CityRepository } from 'src/city/city.repository';
import { CityEntity } from 'src/city/entities/city.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AddressEntity, UserEntity, CityEntity])],
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
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
    {
      provide: ICityRepository,
      useClass: CityRepository,
    },
  ],
})
export class AddressModule {}
