import { ReturnCityDto } from '../dtos/return-city-dto';
import { ICityCrud } from './city-crud.interface';

export abstract class ICityService extends ICityCrud {
  abstract findByState(stateId: number): Promise<ReturnCityDto[]>;
}
