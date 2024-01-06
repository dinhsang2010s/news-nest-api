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
  BadRequestException,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { v4 as unitId } from 'uuid';
import { join, parse } from 'path';
import { Public } from '../../guards/objects';
import { type Response } from 'express';

const fs = require('fs').promises;

export const storage = {
  storage: diskStorage({
    destination: './wp-contents',
    filename: (req, file, cb) => {
      const filename: string =
        parse(file.originalname).name.replace(/\s/g, '') + unitId();
      const extension: string = parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

@ApiTags('Upload')
@Controller('Wp-contents')
export class UploadController {
  constructor() {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @Public()
  getFile(@Param('id') id: string, @Res() res: Response) {
    return res.sendFile(join(process.cwd(), 'wp-contents/' + id));
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', storage))
  uploadFile(@UploadedFile() file: Express.Multer.File): { fileName: string } {
    return { fileName: file.filename };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteFile(@Param('id') id: string) {
    try {
      await fs.unlink(join(process.cwd(), 'wp-contents/' + id));
      return ApiOkResponse();
    } catch (err) {
      throw new BadRequestException(err?.message);
    }
  }
}
