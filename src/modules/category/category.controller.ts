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
import { CategoryService } from './category.service';
import { CategoryDto } from 'src/dtos/request.dtos';

@ApiTags('Category')
@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get('')
  @Public()
  @HttpCode(HttpStatus.OK)
  getAll() {
    return this.categoryService.getAll();
  }

  @Post('')
  @HttpCode(HttpStatus.NO_CONTENT)
  add(@Request() req, @Body() model: CategoryDto) {
    return this.categoryService.add({
      ...model,
      createdBy: req.user.id,
    });
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  update(@Param('id') id: string, @Body() model: CategoryDto, @Request() req) {
    return this.categoryService.update(id, {
      ...model,
      updatedBy: req.user.id,
    });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: any) {
    return this.categoryService.delete(id);
  }
}
