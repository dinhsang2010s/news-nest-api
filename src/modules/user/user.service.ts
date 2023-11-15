import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterDto } from 'src/dtos/request.dtos';
import { IUser } from 'src/interfaces/user';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private users: Model<IUser>,
  ) {}

  async getOne(name: string): Promise<IUser> {
    return await this.users.findOne({ name });
  }

  async add(registerDto: RegisterDto): Promise<void> {
    await this.users.create(registerDto);
  }
}
