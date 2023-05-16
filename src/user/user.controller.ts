import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';
import { IUserService } from './interfaces/user-service.interface';
import { IUserCRUD } from './interfaces/user-crud.interface';

@Controller('user')
export class UserController implements IUserCRUD {
  constructor(private readonly userService: IUserService) {}
  @Get()
  async findAll(): Promise<UserEntity[]> {
    try {
      return await this.userService.findAll();
    } catch (error) {
      throw new Error(error);
    }
  }

  @Post()
  async create(@Body() createUser: CreateUserDto) {
    try {
      return await this.userService.create(createUser);
    } catch (error) {
      throw new Error(error);
    }
  }
}
