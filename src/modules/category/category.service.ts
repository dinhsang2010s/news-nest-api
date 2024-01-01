import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CategoryDto,
  QueryPaginationDto,
} from 'src/dtos/request.dtos/request.dtos';
import { ICategory } from 'src/dtos/response.dtos/category';
import { Pagination } from 'src/dtos/response.dtos/pagination';
import { CategoryInterface } from 'src/interfaces/category.interface';
import { Category } from 'src/schemas/category.schema';

@Injectable()
export class CategoryService implements CategoryInterface {
  constructor(
    @InjectModel(Category.name)
    private categories: Model<ICategory>,
  ) {}

  async getPagination(
    query: QueryPaginationDto,
  ): Promise<Pagination<ICategory[]>> {
    const { offset, pageSize, orderBy, q } = query;
    const searchQ = {
      name: {
        $regex: q,
        $options: 'i',
      },
    };

    const data = await this.categories.aggregate([
      { $match: q ? searchQ : {} },
      { $sort: { [orderBy || 'createdAt']: -1 } },
      { $skip: parseInt(offset) },
      { $limit: parseInt(pageSize) },
      {
        $lookup: {
          from: 'users',
          let: { userId: { $toObjectId: '$createdBy' } },
          pipeline: [
            { $match: { $expr: { $and: [{ $eq: ['$_id', '$$userId'] }] } } },
          ],
          as: 'create',
        },
      },
      { $unwind: { path: '$create', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'users',
          let: { userId: { $toObjectId: '$updatedBy' } },
          pipeline: [
            { $match: { $expr: { $and: [{ $eq: ['$_id', '$$userId'] }] } } },
          ],
          as: 'update',
        },
      },
      { $unwind: { path: '$update', preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: 0,
          id: '$_id',
          name: 1,
          createdBy: '$create.name',
          updatedBy: '$update.name',
          status: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ]);

    return {
      data,
      total: (await this.categories.countDocuments()) ?? 0,
    };
  }

  async getById(id: string): Promise<ICategory> {
    return await this.categories.findById(id);
  }

  async update(catId: string, model: CategoryDto): Promise<ICategory> {
    if (!catId || catId === '') {
      const cat = await this.categories.findOne({ name: model.name });
      if (cat)
        throw new BadRequestException(
          `Category [ ${model.name} ] already exists`,
        );

      return await this.categories.create(model);
    }

    return await this.categories.findByIdAndUpdate({ _id: catId }, model, {
      new: true,
    });
  }

  async delete(catId: string): Promise<void> {
    await this.categories.deleteOne({ _id: catId });
  }
}
