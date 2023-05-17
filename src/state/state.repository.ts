import { Injectable } from '@nestjs/common';
import { IStateRepository } from './interfaces/state-repository.interface';
import { StateEntity } from './entities/state.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StateRepository implements IStateRepository {
  constructor(
    @InjectRepository(StateEntity)
    private readonly stateRepository: Repository<StateEntity>,
  ) {}

  async findAll(): Promise<StateEntity[]> {
    return this.stateRepository.find({
      select: {
        id: true,
        name: true,
      },
      order: {
        name: 'ASC',
      },
    });
  }
}
