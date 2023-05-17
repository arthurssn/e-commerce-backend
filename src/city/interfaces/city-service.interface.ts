import { CityEntity } from '../entities/city.entity';
import { ICityCrud } from './city-crud.interface';

export abstract class ICityService extends ICityCrud {
  abstract findByState(stateId: number): Promise<CityEntity[]>;
}
