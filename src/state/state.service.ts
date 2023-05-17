import { Injectable } from '@nestjs/common';
import { StateEntity } from './entities/state.entity';
import { IStateService } from './interfaces/state-service.interface';
import { IStateRepository } from './interfaces/state-repository.interface';

@Injectable()
export class StateService implements IStateService {
  constructor(private readonly stateRepository: IStateRepository) {}

  async findAll(): Promise<StateEntity[]> {
    return this.stateRepository.findAll();
  }
}
