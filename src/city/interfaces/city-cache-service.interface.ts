import { ReturnCityDto } from '../dtos/return-city-dto';

export abstract class ICityCacheService {
  abstract getCachedCities(stateId?: number): Promise<ReturnCityDto[]>;
  abstract cacheCities(
    cities: ReturnCityDto[],
    stateId?: number,
  ): Promise<void>;
}
