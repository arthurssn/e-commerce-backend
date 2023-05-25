import { ReturnCityDto } from '../dtos/return-city-dto';

export abstract class ICityCrud {
  abstract findAll(): Promise<ReturnCityDto[]>;
  abstract findById(cityId: number): Promise<ReturnCityDto>;
}
