import { Injectable } from '@nestjs/common';
import { IStateService } from './interfaces/state-service.interface';
import { IStateRepository } from './interfaces/state-repository.interface';
import { ReturnStateDto } from './dtos/return-state.dto';

@Injectable()
export class StateService implements IStateService {
  constructor(private readonly stateRepository: IStateRepository) {}

  async findAll(): Promise<ReturnStateDto[]> {
    const states = await this.stateRepository.findAll();
    return states.map((state) => new ReturnStateDto(state));
  }
}
