import { Controller, Get, Query } from '@nestjs/common';
import { ICityCrud } from './interfaces/city-crud.interface';
import { CityEntity } from './entities/city.entity';
import { ICityService } from './interfaces/city-service.interface';

@Controller('city')
export class CityController implements ICityCrud {
  constructor(private readonly cityService: ICityService) {}

  @Get()
  async findAll(@Query('state') stateId?: number): Promise<CityEntity[]> {
    if (stateId) {
      return await this.cityService.findByState(stateId);
    }
    return await this.cityService.findAll();
  }
}
