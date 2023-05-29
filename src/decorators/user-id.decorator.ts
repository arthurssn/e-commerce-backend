import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginPayloadDto } from 'src/auth/dtos/login-payload.dto';
import { extractTokenFromHeader } from 'src/helpers/extract-token-from-header';

export const UserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const { authorization } = ctx.switchToHttp().getRequest().headers;
    const token = extractTokenFromHeader(authorization);
    const jwtService = new JwtService({ secret: 'MINHA_CHAVE' });

    const payload: LoginPayloadDto = jwtService.verify(token);

    return payload.sub;
  },
);
