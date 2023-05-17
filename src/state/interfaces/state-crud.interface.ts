import { StateEntity } from '../entities/state.entity';

export abstract class IStateCRUD {
  abstract findAll(): Promise<StateEntity[]>;
}
