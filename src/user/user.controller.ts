import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { IUserService } from './interfaces/user-service.interface';
import { IUserCRUD } from './interfaces/user-crud.interface';
import { returnUserDto } from './dtos/returnUser.dto';
import { returnUserWithAddressesDto } from 'src/user/dtos/return-user-with-addresses.dto';
import { Public } from 'src/auth/auth.module';

@Controller('user')
export class UserController implements IUserCRUD {
  constructor(private readonly userService: IUserService) {}

  @Get()
  async findAll(): Promise<returnUserDto[]> {
    try {
      return await this.userService.findAll();
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get('/:userId')
  async findById(
    @Param('userId')
    userId: number,
  ): Promise<returnUserDto> {
    return this.userService.findById(userId);
  }

  @Get('/:userId/address')
  async findUserWithAddresses(
    userId: number,
  ): Promise<returnUserWithAddressesDto> {
    return await this.userService.findUserWithAddresses(userId);
  }

  @Public()
  @Post()
  async create(@Body(new ValidationPipe()) createUser: CreateUserDto) {
    try {
      return await this.userService.create(createUser);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
