import { ReturnCityWithStateDto } from 'src/city/dtos/return-city-with-state.dto';
import { AddressEntity } from '../entities/address.entity';

export class ReturnAddress {
  complement: string;
  numberAddress: number;
  cep: string;
  city: ReturnCityWithStateDto;

  constructor(addressEntity: AddressEntity) {
    this.complement = addressEntity.complement;
    this.numberAddress = addressEntity.numberAddress;
    this.cep = addressEntity.cep;
    this.city = new ReturnCityWithStateDto(addressEntity.city);
  }
}
