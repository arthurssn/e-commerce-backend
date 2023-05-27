import { Controller, Get } from '@nestjs/common';
import { IStateCRUD } from './interfaces/state-crud.interface';
import { IStateService } from './interfaces/state-service.interface';
import { ReturnStateDto } from './dtos/return-state.dto';
import { Public } from 'src/auth/auth.module';

@Controller('state')
export class StateController implements IStateCRUD {
  constructor(private readonly stateService: IStateService) {}

  @Public()
  @Get()
  async findAll(): Promise<ReturnStateDto[]> {
    return await this.stateService.findAll();
  }
}
