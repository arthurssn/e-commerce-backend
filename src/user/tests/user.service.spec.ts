import { returnUserDto } from '../dtos/returnUser.dto';
import { IUserRepository } from '../interfaces/user-repository.interface';
import { UserService } from '../user.service';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: IUserRepository;

  beforeEach(() => {
    userRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      findUserByEmail: jest.fn(),
      findUserWithAddresses: jest.fn(),
    };
    userService = new UserService(userRepository);
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users: returnUserDto[] = [
        {
          id: 1,
          name: 'Arthur',
          cpf: '123.123.123-12',
          email: 'arthurnovaes@example.com',
        },
        {
          id: 2,
          name: 'Novaes',
          cpf: '123.123.123-12',
          email: 'arthurnovaes@example.com',
        },
      ];

      (userRepository.findAll as jest.Mock).mockResolvedValue(users);

      const result = await userService.findAll();

      expect(userRepository.findAll).toHaveBeenCalled();
      expect(result).toEqual(users);
    });
  });
});
