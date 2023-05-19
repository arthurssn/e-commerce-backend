import { Injectable } from '@nestjs/common';
import { ICityService } from './interfaces/city-service.interface';
import { CityEntity } from './entities/city.entity';
import { ICityRepository } from './interfaces/city-repository.interface';
import { ICityCacheService } from './interfaces/city-cache-service.interface';

@Injectable()
export class CityService implements ICityService {
  constructor(
    private readonly cityRepository: ICityRepository,
    private readonly cityCacheService: ICityCacheService,
  ) {}

  async findAll(): Promise<CityEntity[]> {
    const cachedData = await this.cityCacheService.getCachedCities();
    if (cachedData) {
      return cachedData;
    }
    const cities = await this.cityRepository.findAll();

    this.cityCacheService.cacheCities(cities);

    return cities;
  }

  async findById(cityId: number): Promise<CityEntity> {
    return await this.cityRepository.findById(cityId);
  }

  async findByState(stateId: number): Promise<CityEntity[]> {
    const cachedData = await this.cityCacheService.getCachedCities(stateId);
    if (cachedData) {
      return cachedData;
    }

    const cities = await this.cityRepository.findByState(stateId);

    this.cityCacheService.cacheCities(cities, stateId);

    return cities;
  }
}
