import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { LoginPayloadDto } from 'src/auth/dtos/login-payload.dto';
import { ROLES_KEY } from 'src/decorators/roles.decorator';
import { UserType } from 'src/enums/user-type.enum';
import { extractTokenFromHeader } from 'src/helpers/extract-token-from-header';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserType[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }

    const { authorization } = context.switchToHttp().getRequest().headers;
    const payload = await this.getPayloadFromToken(authorization);

    if (!payload) return false;

    return requiredRoles.some((role) => role === payload.typeUser);
  }

  async getPayloadFromToken(
    authorization: string,
  ): Promise<LoginPayloadDto> | undefined {
    const token = extractTokenFromHeader(authorization);

    const payload: LoginPayloadDto | undefined = await this.jwtService
      .verifyAsync(token, {
        secret: process.env.JWT_SECRET_KEY,
      })
      .catch(() => undefined);

    return payload;
  }
}
