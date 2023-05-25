import { ReturnCityDto } from '../dtos/return-city-dto';
import { CityEntity } from '../entities/city.entity';
import { ICityCrud } from './city-crud.interface';

export abstract class ICityRepository extends ICityCrud {
  abstract findByState(stateId: number): Promise<ReturnCityDto[]>;

  abstract findAll(): Promise<CityEntity[]>;
}
