import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { IUserService } from './interfaces/user-service.interface';
import { IUserCRUD } from './interfaces/user-crud.interface';
import { returnUserDto } from './dtos/returnUser.dto';

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

  @Post()
  async create(@Body(new ValidationPipe()) createUser: CreateUserDto) {
    try {
      return await this.userService.create(createUser);
    } catch (error) {
      throw new Error(error);
    }
  }
}
