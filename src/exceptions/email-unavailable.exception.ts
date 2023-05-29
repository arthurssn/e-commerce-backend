import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailUnavailableException extends HttpException {
  constructor() {
    super('Email já está em uso por outro usuário.', HttpStatus.CONFLICT);
  }
}
