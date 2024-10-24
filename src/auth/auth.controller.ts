import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { LoginUserDto, RegisterUserDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('register')
  registerUser(@Body() registerDto: RegisterUserDto) {
    return this.client.send('auth.register.user', registerDto);
  }

  @Post('login')
  loginUser(@Body() loginDto: LoginUserDto) {
    return this.client.send('auth.login.user', loginDto);
  }

  @Get('verify')
  verify() {
    return this.client.send('auth.verify.user', {});
  }
}
