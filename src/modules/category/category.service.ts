import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryDto } from 'src/dtos/request.dtos/request.dtos';
import { ICategory } from 'src/dtos/response.dtos/category';
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
    const res = await this.categories.create(model);
    return res;
  }

  async update(catId: string, model: CategoryDto): Promise<ICategory> {
    const res = await this.categories.findByIdAndUpdate({ _id: catId }, model, {
      new: true,
    });
    return res;
  }

  async delete(catId: string): Promise<void> {
    await this.categories.deleteOne({ _id: catId });
  }
}
