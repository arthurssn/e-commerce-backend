import { CreateUserDto } from '../dtos/createUser.dto';
import { returnUserWithAddressesDto } from '../dtos/return-user-with-addresses.dto';
import { returnUserDto } from '../dtos/returnUser.dto';
import { IUserService } from '../interfaces/user-service.interface';
import { UserController } from '../user.controller';

describe('UserController', () => {
  let userController: UserController;
  let userService: IUserService;

  beforeEach(() => {
    userService = {
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      findUserWithAddresses: jest.fn(),
    };
    userController = new UserController(userService);
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      userController.findAll();

      expect(userService.findAll).toHaveBeenCalled();
    });

    it('should throw an error if an error occurs', async () => {
      (userService.findAll as jest.Mock).mockRejectedValue(new Error());

      expect(userController.findAll()).rejects.toThrowError();
    });
  });

  describe('findById', () => {
    it('should return a user by id', async () => {
      const userId = 1;
      const returnedUser: returnUserDto = {
        id: 1,
        cpf: '123.456.789-10',
        email: 'arthurnovaes@example.com',
        name: 'Arthur',
      };

      (userService.findById as jest.Mock).mockResolvedValue(returnedUser);

      const result = await userController.findById(userId);

      expect(userService.findById).toHaveBeenCalledWith(userId);
      expect(result).toEqual(returnedUser);
    });

    it('should throw an error if an error occurs', async () => {
      const userId = 1;

      (userService.findById as jest.Mock).mockRejectedValue(new Error());

      expect(userController.findById(userId)).rejects.toThrowError();
    });
  });

  describe('findUserWithAddresses', () => {
    it('should return a user with address', async () => {
      const userId = 1;

      const returnedUser: returnUserWithAddressesDto = {
        user: {
          id: userId,
          cpf: '123.456.789-10',
          email: 'arthurnovaes@example.com',
          name: 'Arthur',
        },
        addresses: [],
      };

      (userService.findUserWithAddresses as jest.Mock).mockResolvedValue(
        returnedUser,
      );

      const result = await userController.findUserWithAddresses(userId);

      expect(result).toEqual(returnedUser);
      expect(userService.findUserWithAddresses).toHaveBeenCalledWith(userId);
    });

    it('should throw an error if an error occurs', async () => {
      const userId = 1;

      (userService.findUserWithAddresses as jest.Mock).mockRejectedValue(
        new Error(),
      );

      expect(
        userController.findUserWithAddresses(userId),
      ).rejects.toThrowError();
    });
  });

  describe('create', () => {
    it('should create and return a user', async () => {
      const userToCreate: CreateUserDto = {
        name: 'Arthur',
        cpf: '123.456.789-10',
        email: 'arthurnovaes@example.com',
        password: '12345678',
        typeUser: 1,
      };

      const returnedUser: returnUserDto = new returnUserDto({
        ...userToCreate,
        addresses: [],
        id: 1,
      });

      (userService.create as jest.Mock).mockResolvedValue(returnedUser);

      const result = await userController.create(userToCreate);

      expect(userService.create).toHaveBeenCalled();
      expect(result).toEqual(returnedUser);
    });

    it('should throw an error if an error occurs', async () => {
      (userService.create as jest.Mock).mockRejectedValue(new Error());

      expect(userController.create({} as CreateUserDto)).rejects.toThrowError();
    });
  });
});
