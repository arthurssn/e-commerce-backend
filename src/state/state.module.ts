import { Module } from '@nestjs/common';
import { StateController } from './state.controller';
import { StateService } from './state.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StateEntity } from './entities/state.entity';
import { IStateService } from './interfaces/state-service.interface';
import { StateRepository } from './state.repository';
import { IStateRepository } from './interfaces/state-repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([StateEntity])],
  controllers: [StateController],
  providers: [
    {
      provide: IStateService,
      useClass: StateService,
    },
    {
      provide: IStateRepository,
      useClass: StateRepository,
    },
  ],
})
export class StateModule {}
