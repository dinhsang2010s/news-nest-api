import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryDto } from 'src/dtos/request.dtos';
import { ICategory } from 'src/interfaces/category';
import { Category } from 'src/schemas/category.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private categories: Model<ICategory>,
  ) {}

  async getAll(): Promise<ICategory[]> {
    return await this.categories.find();
  }

  async add(model: CategoryDto): Promise<ICategory> {
    return await this.categories.create(model);
  }

  async update(catId: string, model: CategoryDto): Promise<ICategory> {
    return await this.categories.findOneAndUpdate({ _id: catId }, model);
  }

  async delete(catId: string): Promise<void> {
    await this.categories.deleteOne({ _id: catId });
  }
}
