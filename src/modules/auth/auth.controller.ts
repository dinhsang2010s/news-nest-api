import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from 'src/dtos/request.dtos';
import { Public } from 'src/guards/metadata';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() model: RegisterDto) {
    return this.authService.register(model);
  }

  @Post('login')
  login(@Body() model: LoginDto) {
    return this.authService.login(model);
  }
}
