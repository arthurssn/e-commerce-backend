import { EmailUnavailableException } from 'src/exceptions/email-unavailable.exception';
import { CreateUserDto } from '../dtos/createUser.dto';
import { returnUserDto } from '../dtos/returnUser.dto';
import { UserEntity } from '../entities/user.entity';
import { IUserRepository } from '../interfaces/user-repository.interface';
import { UserService } from '../user.service';
import { returnUserWithAddressesDto } from '../dtos/return-user-with-addresses.dto';

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

  describe('findById', () => {
    it('should return a user by id', async () => {
      const userId = 1;
      const user: returnUserDto = {
        id: 1,
        name: 'Arthur',
        cpf: '123.123.123-12',
        email: 'arthurnovaes@example.com',
      };

      (userRepository.findById as jest.Mock).mockResolvedValue(user);

      const result = await userService.findById(userId);

      expect(userRepository.findById).toHaveBeenCalled();
      expect(userRepository.findById).toHaveBeenCalledWith(userId);
      expect(result).toEqual(user);
    });
  });

  describe('create', () => {
    it('should create a new user and return the user object', async () => {
      const createUserDto: CreateUserDto = {
        name: 'Arthur',
        cpf: '123.123.123-12',
        email: 'arthurnovaes@example.com',
        password: '123456',
        typeUser: 1,
      };

      const hashedPassword = '654321';
      const createdUser: UserEntity = {
        ...createUserDto,
        id: 1,
        password: hashedPassword,
        addresses: [],
      };

      (userRepository.findUserByEmail as jest.Mock).mockResolvedValue(null);
      (userRepository.create as jest.Mock).mockResolvedValue(createdUser);
      userService['hashingPassword'] = jest
        .fn()
        .mockResolvedValue(hashedPassword);

      const result = await userService.create(createUserDto);

      expect(userRepository.findUserByEmail).toHaveBeenCalledWith(
        createUserDto.email,
      );

      expect(userRepository.create).toHaveBeenCalledWith({
        typeUser: 1,
        ...createUserDto,
        password: hashedPassword,
      });

      expect(result).toEqual(new returnUserDto(createdUser));
    });

    it('should throw EmailUnavailableException if email is not available', async () => {
      const createUserDto: CreateUserDto = {
        name: 'Arthur',
        cpf: '123.123.123-12',
        email: 'arthurnovaes@example.com',
        password: '123456',
        typeUser: 1,
      };

      (userRepository.findUserByEmail as jest.Mock).mockResolvedValue({
        email: 'test@example.com',
      });

      expect(userService.create(createUserDto)).rejects.toThrow(
        EmailUnavailableException,
      );
    });
  });

  describe('findUserWithAddresses', () => {
    it('should return a user with address', async () => {
      const userId = 1;

      const returnedUser: UserEntity = {
        name: 'Arthur',
        cpf: '123.123.123-12',
        email: 'arthurnovaes@example.com',
        password: '123456',
        typeUser: 1,
        id: 1,
        addresses: [],
      };

      (userRepository.findUserWithAddresses as jest.Mock).mockResolvedValue(
        returnedUser,
      );
      const result = await userService.findUserWithAddresses(userId);

      expect(userRepository.findUserWithAddresses).toHaveBeenCalledWith(userId);
      expect(result).not.toEqual(new returnUserWithAddressesDto(returnedUser));
    });
  });
});
