import { CityEntity } from '../entities/city.entity';

export class ReturnCityDto {
  id: number;
  name: string;

  constructor(city: CityEntity) {
    this.id = city.id;
    this.name = city.name;
  }
}
