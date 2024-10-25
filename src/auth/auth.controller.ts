import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { LoginUserDto, RegisterUserDto } from './dto';
import { catchError } from 'rxjs';
import { Request } from 'express';
import { AuthGuard } from './guards/auth.guard';
import { GetUser } from './decorators/user.decorator';
import { CurrentUser } from './interfaces/user.interface';
import { GetToken } from './decorators/token.decorator';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('register')
  registerUser(@Body() registerDto: RegisterUserDto) {
    return this.client.send('auth.register.user', registerDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Post('login')
  loginUser(@Body() loginDto: LoginUserDto) {
    return this.client.send('auth.login.user', loginDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @UseGuards(AuthGuard)
  @Get('verify')
  verify(@GetUser() user: CurrentUser, @GetToken() token: string) {
    // return this.client.send('auth.verify.user', {user, token});
    return {user, token}
  }
}
