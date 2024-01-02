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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Public } from 'src/guards/objects';
import { ApiTags } from '@nestjs/swagger';
import { ArticleService } from './post.service';
import {
  ArticleDto,
  QueryPaginationDto,
} from 'src/dtos/request.dtos/request.dtos';
import { Status } from 'src/schemas/enums';
import path = require('path');
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { Observable, of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

export const storage = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

@ApiTags('Article')
@Controller('articles')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  async getPagination(@Query() query: QueryPaginationDto) {
    return await this.articleService.getPagination(query);
  }

  @Get(':id')
  @Public()
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: string) {
    return await this.articleService.getById(id);
  }

  @Post('')
  @HttpCode(HttpStatus.OK)
  async add(@Request() req, @Body() model: ArticleDto) {
    return await this.articleService.update('', {
      ...model,
      status: model.status ?? Status.Running,
      createdBy: req.user.id,
      createdAt: new Date(),
    });
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Request() req,
    @Body() model: ArticleDto,
  ) {
    return this.articleService.update(id, {
      ...model,
      updatedBy: req.user.id,
      updatedAt: new Date(),
    });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: any) {
    await this.articleService.delete(id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', storage))
  uploadFile(@UploadedFile() file): Observable<{ pathImage: string }> {
    return of({ pathImage: file.pathImage });
  }
}
