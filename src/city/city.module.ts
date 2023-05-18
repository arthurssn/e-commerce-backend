import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { ICityService } from './interfaces/city-service.interface';
import { ICityRepository } from './interfaces/city-repository.interface';
import { CityRepository } from './city.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityEntity } from './entities/city.entity';
import { ICityCacheService } from './interfaces/city-cache-service.interface';
import { CityCacheService } from './city-cache.service';

@Module({
  imports: [
    CacheModule.register({
      ttl: 0,
    }),
    TypeOrmModule.forFeature([CityEntity]),
  ],
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
    {
      provide: ICityCacheService,
      useClass: CityCacheService,
    },
  ],
})
export class CityModule {}
