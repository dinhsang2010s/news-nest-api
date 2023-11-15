import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @ApiProperty({ type: 'string', description: 'admin' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  @ApiProperty({ type: 'string', description: '123456' })
  password: string;
}

export class LoginDto extends RegisterDto {
  @ApiProperty({ type: 'boolean', description: 'false', required: false })
  remember?: boolean;
}

export class CategoryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', description: 'Tin Tuc', required: true })
  name: string;

  createdBy: string;
  updatedBy: string;
}
