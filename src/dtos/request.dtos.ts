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

export class QueryPagination {
  offset: number;
  pageSize: number;
  orderBy: string;
}

export class CategoryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', required: true })
  name: string;

  status: number;
  createdBy: string;
  updatedBy: string;
}

export class PostDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    description: 'Toàn bộ thay đổi và thời gian cập nhật của ColorOS 14',
    required: true,
  })
  title: string;

  @IsString()
  @ApiProperty({
    type: 'string',
    description:
      'OPPO đã phát hành phiên bản beta của ColorOS 14 tới người dùng ở một số khu vực nhất định.',
    required: false,
  })
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    description:
      'Trong phiên bản ColorOS 14, OPPO đã giới thiệu một nền tảng hiệu suất mới tên là Trinity Engine. ',
    required: true,
  })
  content: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    description: 'abc123',
    required: true,
  })
  categoryId: string;

  @ApiProperty({
    type: 'string',
    isArray: true,
    description: '["http://images.googleusercontent","AAAAAAAA"]',
    required: false,
  })
  image: string[];

  @ApiProperty({
    type: 'string',
    isArray: true,
    description: '["http://images.googleusercontent","AAAAAAAA"]',
    required: false,
  })
  link: string[];

  @ApiProperty({
    type: 'string',
    isArray: true,
    description: '["ColorOS 14","AAAAAAAA"]',
    required: false,
  })
  tagSearchIds: [];

  @ApiProperty({
    type: 'string',
    description: 'toan-bo-tinh-nang-va-thay-doi-co-tren-coloros-14',
    required: false,
  })
  keyWordSeo: string;

  @ApiProperty({
    type: 'string',
    description: 'Toàn bộ thay đổi và thời gian cập nhật của ColorOS 14',
    required: false,
  })
  descriptionSeo: string;

  status: number;
  createdBy: string;
  updatedBy: string;
}
