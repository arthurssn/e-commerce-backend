import { Controller, Get } from '@nestjs/common';
import { StateEntity } from './entities/state.entity';
import { IStateCRUD } from './interfaces/state-crud.interface';
import { IStateService } from './interfaces/state-service.interface';

@Controller('state')
export class StateController implements IStateCRUD {
  constructor(private readonly stateService: IStateService) {}

  @Get()
  async findAll(): Promise<StateEntity[]> {
    return await this.stateService.findAll();
  }
}
