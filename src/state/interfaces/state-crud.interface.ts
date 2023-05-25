import { ReturnStateDto } from '../dtos/return-state.dto';

export abstract class IStateCRUD {
  abstract findAll(): Promise<ReturnStateDto[]>;
}
