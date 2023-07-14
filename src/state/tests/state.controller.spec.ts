import { IStateService } from '../interfaces/state-service.interface';
import { StateController } from '../state.controller';
import { statesMock } from './mocks/state.mock';

describe('StateController', () => {
  let stateController: StateController;
  let stateService: IStateService;

  beforeEach(() => {
    stateService = {
      findAll: jest.fn(),
    };

    stateController = new StateController(stateService);
  });

  describe('findAll', () => {
    it('should return an array of states', async () => {
      (stateService.findAll as jest.Mock).mockResolvedValue(statesMock);

      const result = await stateController.findAll();

      expect(stateService.findAll).toHaveBeenCalled();
      expect(result).toEqual(statesMock);
    });
  });
});
