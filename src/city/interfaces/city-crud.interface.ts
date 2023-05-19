import { CityEntity } from '../entities/city.entity';

export abstract class ICityCrud {
  abstract findAll(stateId?: number): Promise<CityEntity[]>;
  abstract findById(cityId: number): Promise<CityEntity>;
}
