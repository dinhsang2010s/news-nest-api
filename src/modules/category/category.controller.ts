import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { Public } from 'src/guards/objects';
import { ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CategoryDto } from 'src/dtos/request.dtos/request.dtos';
import { status } from 'src/schemas/enums';

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

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: string) {
    await this.categoryService.getById(id);
  }

  @Post('')
  @HttpCode(HttpStatus.OK)
  async add(@Request() req, @Body() model: CategoryDto) {
    return await this.categoryService.add({
      ...model,
      status: status.Running,
      createdBy: req.user.id,
    });
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() model: CategoryDto,
    @Request() req,
  ) {
    return await this.categoryService.update(id, {
      ...model,
      updatedBy: req.user.id,
    });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string) {
    await this.categoryService.delete(id);
  }
}
