import {
  Controller,
  UploadedFile,
  UseInterceptors,
  Post,
  Get,
  Param,
  Res,
  HttpCode,
  HttpStatus,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { v4 as unitId } from 'uuid';
import { parse } from 'path';
import { Public } from '../../guards/objects';
import { type Response } from 'express';
import { UploadService } from './upload.service';

export const storage = {
  storage: diskStorage({
    destination: './wp-contents',
    filename: (req, file, cb) => {
      const filename: string = unitId();
      const extension: string = parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

@ApiTags('Upload')
@Controller('Wp-contents')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @Public()
  getFile(@Param('id') id: string, @Res() res: Response) {
    this.uploadService.getFile(id, res);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', storage))
  uploadFile(@UploadedFile() file: Express.Multer.File): { fileName: string } {
    return this.uploadService.uploadFile(file);
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  async deleteFile(@Query() query: { imageUri: string }) {
    await this.uploadService.deleteFile(query);
  }
}
