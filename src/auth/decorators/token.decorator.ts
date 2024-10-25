import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

export const GetToken = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    if (!request.token) {
      throw new InternalServerErrorException('Bad Request format');
    }

    return request.token;
  },
);
