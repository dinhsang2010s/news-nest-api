import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { LoginDto, RegisterDto } from 'src/dtos/request.dtos';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<{ name: string }> {
    const { name, password } = registerDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    await this.userService.add({
      name,
      password: hashedPassword,
    });
    return { name };
  }

  async login(model: LoginDto): Promise<IToken> {
    const { name, password } = model;

    const user = await this.userService.getOne(name);
    if (!user) throw new UnauthorizedException('Invalid username or password!');

    const isPasswordMatched = await bcrypt.compareSync(password, user.password);
    if (!isPasswordMatched)
      throw new UnauthorizedException('Invalid username or password!');

    const token = await this.jwtService.signAsync({ i: user._id });
    return {
      type: 'Bearer',
      accessToken: token,
    };
  }
}
