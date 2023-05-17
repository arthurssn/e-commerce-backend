import { Module } from '@nestjs/common';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { ICityService } from './interfaces/city-service.interface';
import { ICityRepository } from './interfaces/city-repository.interface';
import { CityRepository } from './city.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityEntity } from './entities/city.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CityEntity])],
  controllers: [CityController],
  providers: [
    {
      provide: ICityService,
      useClass: CityService,
    },
    {
      provide: ICityRepository,
      useClass: CityRepository,
    },
  ],
})
export class CityModule {}
