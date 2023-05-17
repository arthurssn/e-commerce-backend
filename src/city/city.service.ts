import { Injectable } from '@nestjs/common';
import { ICityService } from './interfaces/city-service.interface';
import { CityEntity } from './entities/city.entity';
import { ICityRepository } from './interfaces/city-repository.interface';

@Injectable()
export class CityService implements ICityService {
  constructor(private readonly cityRepository: ICityRepository) {}

  async findAll(): Promise<CityEntity[]> {
    return await this.cityRepository.findAll();
  }

  async findByState(stateId: number): Promise<CityEntity[]> {
    return await this.cityRepository.findByState(stateId);
  }
}
