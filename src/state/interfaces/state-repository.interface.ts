import { StateEntity } from '../entities/state.entity';
import { IStateCRUD } from './state-crud.interface';

export abstract class IStateRepository extends IStateCRUD {
  abstract findAll(): Promise<StateEntity[]>;
}
