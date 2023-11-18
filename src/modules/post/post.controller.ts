import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import { Public } from 'src/guards/objects';
import { ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';
import { PostDto, QueryPagination } from 'src/dtos/request.dtos';
import { status } from 'src/schemas/enums';

@ApiTags('Post')
@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Get('')
  @Public()
  @HttpCode(HttpStatus.OK)
  getPagination(@Query() query: QueryPagination) {
    return this.postService.getPagination(query);
  }

  @Post('')
  @HttpCode(HttpStatus.NO_CONTENT)
  add(@Request() req, @Body() model: PostDto) {
    return this.postService.add({
      ...model,
      status: status.Running,
      createdBy: req.user.id,
    });
  }
}
