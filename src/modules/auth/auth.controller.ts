import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from 'src/dtos/request.dtos';
import { Public } from 'src/guards/metadata';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Public()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.OK)
  register(@Body() model: RegisterDto) {
    return this.authService.register(model);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() model: LoginDto) {
    return this.authService.login(model);
  }
}
