import { CityEntity } from '../entities/city.entity';
import { ReturnStateDto } from 'src/state/dtos/return-state.dto';

export class ReturnCityWithStateDto {
  id: number;
  name: string;
  state: ReturnStateDto;

  constructor(city: CityEntity) {
    this.id = city.id;
    this.name = city.name;
    this.state = new ReturnStateDto(city.state);
  }
}
