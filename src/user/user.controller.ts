import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './interfaces/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<UserEntity[]> {
    try {
      return await this.userService.findAll();
    } catch (error) {
      throw new Error(error);
    }
  }

  @Post()
  async createUser(@Body() createUser: CreateUserDto) {
    try {
      return await this.userService.create(createUser);
    } catch (error) {
      throw new Error(error);
    }
  }
}
