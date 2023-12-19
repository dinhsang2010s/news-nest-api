import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryDto } from 'src/dtos/request.dtos/request.dtos';
import { ICategory } from 'src/dtos/response.dtos/category';
import { CategoryInterface } from 'src/interfaces/category.interface';
import { Category } from 'src/schemas/category.schema';

@Injectable()
export class CategoryService implements CategoryInterface {
  constructor(
    @InjectModel(Category.name)
    private categories: Model<ICategory>,
  ) {}

  async getAll(): Promise<ICategory[]> {
    return await this.categories.find().sort({ createdAt: -1 });
  }

  async getById(id: string): Promise<ICategory> {
    return await this.categories.findById(id);
  }

  async add(model: CategoryDto): Promise<ICategory> {
    return await this.categories.create(model);
  }

  async update(catId: string, model: CategoryDto): Promise<ICategory> {
    return await this.categories.findByIdAndUpdate({ _id: catId }, model, {
      new: true,
    });
  }

  async delete(catId: string): Promise<void> {
    await this.categories.deleteOne({ _id: catId });
  }
}
