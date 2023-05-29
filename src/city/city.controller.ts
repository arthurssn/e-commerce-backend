import { Param, Controller, Get, Query } from '@nestjs/common';
import { ICityCrud } from './interfaces/city-crud.interface';
import { ICityService } from './interfaces/city-service.interface';
import { ReturnCityDto } from './dtos/return-city-dto';
import { Public } from 'src/auth/auth.module';

@Public()
@Controller('city')
export class CityController implements ICityCrud {
  constructor(private readonly cityService: ICityService) {}

  @Get()
  async findAll(@Query('state') stateId?: number): Promise<ReturnCityDto[]> {
    if (stateId) {
      return await this.cityService.findByState(stateId);
    }
    return await this.cityService.findAll();
  }

  @Get('/:cityId')
  async findById(@Param('cityId') cityId: number): Promise<ReturnCityDto> {
    return await this.cityService.findById(cityId);
  }
}
