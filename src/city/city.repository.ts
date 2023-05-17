import { Injectable } from '@nestjs/common';
import { ICityRepository } from './interfaces/city-repository.interface';
import { CityEntity } from './entities/city.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CityRepository implements ICityRepository {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
  ) {}
  async findAll(): Promise<CityEntity[]> {
    return this.cityRepository.find();
  }

  async findByState(stateId: number): Promise<CityEntity[]> {
    return await this.cityRepository.find({
      where: {
        stateId,
      },
    });
  }
}
