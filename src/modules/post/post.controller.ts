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
  Request,
} from '@nestjs/common';
import { Public } from 'src/guards/objects';
import { ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';
import { PostDto } from 'src/dtos/request.dtos';

@ApiTags('Post')
@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Get('')
  @Public()
  @HttpCode(HttpStatus.OK)
  getAll() {
    return this.postService.getPagination();
  }

  @Post('')
  @HttpCode(HttpStatus.NO_CONTENT)
  add(@Request() req, @Body() model: PostDto) {
    return this.postService.add({
      ...model,
      createdBy: req.user.id,
    });
  }
}
