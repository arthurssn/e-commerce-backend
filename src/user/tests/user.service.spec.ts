import { EmailUnavailableException } from 'src/exceptions/email-unavailable.exception';
import { returnUserDto } from '../dtos/returnUser.dto';
import { UserEntity } from '../entities/user.entity';
import { IUserRepository } from '../interfaces/user-repository.interface';
import { UserService } from '../user.service';
import { returnUserWithAddressesDto } from '../dtos/return-user-with-addresses.dto';
import {
  createUserDto,
  returnUserDtoMock,
  userEntityMock,
} from './mocks/user.mock';

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
      const users: returnUserDto[] = [returnUserDtoMock, returnUserDtoMock];

      (userRepository.findAll as jest.Mock).mockResolvedValue(users);

      const result = await userService.findAll();

      expect(userRepository.findAll).toHaveBeenCalled();
      expect(result).toEqual(users);
    });
  });

  describe('findById', () => {
    it('should return a user by id', async () => {
      const userId = 1;
      const user: returnUserDto = returnUserDtoMock;

      (userRepository.findById as jest.Mock).mockResolvedValue(user);

      const result = await userService.findById(userId);

      expect(userRepository.findById).toHaveBeenCalled();
      expect(userRepository.findById).toHaveBeenCalledWith(userId);
      expect(result).toEqual(user);
    });
  });

  describe('create', () => {
    it('should create a new user and return the user object', async () => {
      const hashedPassword = '654321';

      const createdUser: UserEntity = {
        ...userEntityMock,
        password: hashedPassword,
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

      const returnedUser = userEntityMock;

      (userRepository.findUserWithAddresses as jest.Mock).mockResolvedValue(
        returnedUser,
      );
      const result = await userService.findUserWithAddresses(userId);

      expect(userRepository.findUserWithAddresses).toHaveBeenCalledWith(userId);
      expect(result).toEqual(new returnUserWithAddressesDto(returnedUser));
    });
  });
});
