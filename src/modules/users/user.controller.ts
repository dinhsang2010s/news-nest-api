import { Controller, Get, Request } from '@nestjs/common';

@Controller('users')
export class UserController {
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
