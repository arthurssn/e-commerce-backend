import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IAddressRepository } from './interfaces/address-repository.interface';
import { IAddressService } from './interfaces/address-service.interface';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { AddressEntity } from './entities/address.entity';
import { IUserRepository } from 'src/user/interfaces/user-repository.interface';
import { ICityRepository } from 'src/city/interfaces/city-repository.interface';

@Injectable()
export class AddressService implements IAddressService {
  constructor(
    private readonly addressRepository: IAddressRepository,
    private readonly usersRepository: IUserRepository,
    private readonly cityRepository: ICityRepository,
  ) {}

  async create(
    createAddressDto: CreateAddressDto,
    userId: number,
  ): Promise<AddressEntity> {
    try {
      await this.validateAddressData(createAddressDto, userId);
      return await this.addressRepository.create(createAddressDto, userId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  private async validateAddressData(
    createAddressDto: CreateAddressDto,
    userId: number,
  ) {
    const user = await this.usersRepository.findById(userId);
    if (!user) throw new NotFoundException('Usuário não existe');

    const { cityId } = createAddressDto;
    const city = await this.cityRepository.findById(cityId);
    if (!city) throw new NotFoundException('Cidade não existe');
  }
}
