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
import {
  PostDto,
  QueryPaginationDto,
} from 'src/dtos/request.dtos/request.dtos';
import { status } from 'src/schemas/enums';

@ApiTags('Post')
@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Get('')
  @Public()
  @HttpCode(HttpStatus.OK)
  async getPagination(@Query() query: QueryPaginationDto) {
    return await this.postService.getPagination(query);
  }

  @Get(':id')
  @Public()
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: string) {
    return await this.postService.getById(id);
  }

  @Post('')
  @HttpCode(HttpStatus.OK)
  async add(@Request() req, @Body() model: PostDto) {
    return await this.postService.update('', {
      ...model,
      status: status.Running,
      createdBy: req.user.id,
    });
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Request() req,
    @Body() model: PostDto,
  ) {
    return this.postService.update(id, {
      ...model,
      updatedBy: req.user.id,
    });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: any) {
    await this.postService.delete(id);
  }
}
