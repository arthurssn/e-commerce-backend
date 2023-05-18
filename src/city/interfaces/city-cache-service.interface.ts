import { CityEntity } from '../entities/city.entity';

export abstract class ICityCacheService {
  abstract getCachedCities(stateId?: number): Promise<CityEntity[]>;
  abstract cacheCities(cities: CityEntity[], stateId?: number): Promise<void>;
}
