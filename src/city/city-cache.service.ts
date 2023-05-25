import { Inject, Injectable } from '@nestjs/common';
import { ICityCacheService } from './interfaces/city-cache-service.interface';
import { CityEntity } from './entities/city.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ReturnCityDto } from './dtos/return-city-dto';

@Injectable()
export class CityCacheService implements ICityCacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getCachedCities(stateId?: number): Promise<ReturnCityDto[]> {
    if (!stateId) {
      return this.getAllCachedCities();
    }
    return this.getCachedCitiesByStateId(stateId);
  }

  async cacheCities(cities: ReturnCityDto[], stateId?: number): Promise<void> {
    if (!stateId) {
      return this.cacheAllCities(cities);
    }
    return this.cacheCitiesByStatedId(cities, stateId);
  }

  private async getAllCachedCities(): Promise<CityEntity[]> {
    return await this.cacheManager.get('cities');
  }

  private async cacheAllCities(cities: ReturnCityDto[]): Promise<void> {
    return await this.cacheManager.set('cities', cities);
  }

  private async getCachedCitiesByStateId(
    stateId: number,
  ): Promise<ReturnCityDto[]> {
    return await this.cacheManager.get(`cities-by-state-${stateId}`);
  }

  private async cacheCitiesByStatedId(
    cities: ReturnCityDto[],
    stateId: number,
  ): Promise<void> {
    return await this.cacheManager.set(`cities-by-state-${stateId}`, cities);
  }
}
