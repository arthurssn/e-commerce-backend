import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StateEntity } from '../entities/state.entity';
import { StateRepository } from '../state.repository';

describe('StateRepository', () => {
  let stateRepository: StateRepository;
  let stateEntityRepository: Repository<StateEntity>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        StateRepository,
        {
          provide: getRepositoryToken(StateEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    stateRepository = moduleRef.get<StateRepository>(StateRepository);
    stateEntityRepository = moduleRef.get<Repository<StateEntity>>(
      getRepositoryToken(StateEntity),
    );
  });

  describe('findAll', () => {
    it('should return an array of state entities', async () => {
      const mockStates: StateEntity[] = [
        {
          id: 1,
          name: 'State 1',
          cities: [],
        },
      ];

      jest
        .spyOn(stateEntityRepository, 'find')
        .mockResolvedValueOnce(mockStates);

      const result = await stateRepository.findAll();

      expect(result).toEqual(mockStates);
      expect(stateEntityRepository.find).toHaveBeenCalledTimes(1);
      expect(stateEntityRepository.find).toHaveBeenCalledWith({
        order: { name: 'ASC' },
      });
    });
  });
});
