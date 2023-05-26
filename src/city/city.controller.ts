import { Controller, Get, Query } from '@nestjs/common';
import { ICityCrud } from './interfaces/city-crud.interface';
import { ICityService } from './interfaces/city-service.interface';
import { ReturnCityDto } from './dtos/return-city-dto';
import { Public } from 'src/auth/auth.module';

@Controller('city')
export class CityController implements ICityCrud {
  constructor(private readonly cityService: ICityService) {}

  @Public()
  @Get()
  async findAll(@Query('state') stateId?: number): Promise<ReturnCityDto[]> {
    if (stateId) {
      return await this.cityService.findByState(stateId);
    }
    return await this.cityService.findAll();
  }

  async findById(cityId: number): Promise<ReturnCityDto> {
    return await this.cityService.findById(cityId);
  }
}
