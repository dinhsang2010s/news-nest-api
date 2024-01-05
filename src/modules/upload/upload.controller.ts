import {
  Controller,
  UploadedFile,
  UseInterceptors,
  Post,
  Get,
  Param,
  Res,
  HttpCode,
  HttpStatus, Delete, BadRequestException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { v4 as uuidv4 } from 'uuid';
import { join, parse } from 'path';
import fs from 'fs';
import { Public } from '../../guards/objects';

export const storage = {
  storage: diskStorage({
    destination: './wp-contents',
    filename: (req, file, cb) => {
      const filename: string =
        parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
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
  getFile(@Param('id') id: string, @Res() res) {
    return res.sendFile(join(process.cwd(), 'wp-contents/' + id));
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', storage))
  uploadFile(@UploadedFile() file): { fileName: string } {
    return { fileName:  file.filename };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteFile(@Param('id') id: string) {
    const  pathFile=join(process.cwd(), 'wp-contents/' + id)
    fs.unlink(pathFile, (err)=>{
      if(err) console.log(err);
    })
  }
}
