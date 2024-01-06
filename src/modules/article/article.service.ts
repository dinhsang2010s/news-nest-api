import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pagination } from 'src/models/dtos/response.dtos/pagination';
import {
  ArticleDto,
  QueryPaginationDto,
} from 'src/models/dtos/request.dtos/request.dtos';
import { IArticle } from 'src/models/dtos/response.dtos/article';
import { Article } from 'src/models/schemas/article.schams';
import { ArticleInterface } from 'src/interfaces/article.interface';

@Injectable()
export class ArticleService implements ArticleInterface {
  constructor(
    @InjectModel(Article.name)
    private articles: Model<IArticle>,
  ) {}

  async getPagination(
    query: QueryPaginationDto,
  ): Promise<Pagination<IArticle[]>> {
    const { offset, pageSize, orderBy, q } = query;
    const searchQ = {
      title: {
        $regex: q,
        $options: 'i',
      },
    };

    const data = await this.articles.aggregate([
      { $match: q ? searchQ : {} },
      { $sort: { [orderBy || 'createdAt']: -1 } },
      { $skip: parseInt(offset) },
      { $limit: parseInt(pageSize) },
      {
        $lookup: {
          from: 'categories',
          let: {
            categoryId: {
              $toObjectId: '$categoryId',
            },
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: ['$_id', '$$categoryId'],
                    },
                  ],
                },
              },
            },
          ],
          as: 'cat',
        },
      },
      {
        $unwind: {
          path: '$cat',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'users',
          let: {
            userId: {
              $toObjectId: '$createdBy',
            },
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: ['$_id', '$$userId'],
                    },
                  ],
                },
              },
            },
          ],
          as: 'create',
        },
      },
      {
        $unwind: {
          path: '$create',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'users',
          let: {
            userId: {
              $toObjectId: '$updatedBy',
            },
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: ['$_id', '$$userId'],
                    },
                  ],
                },
              },
            },
          ],
          as: 'update',
        },
      },
      {
        $unwind: {
          path: '$update',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 0,
          id: '$_id',
          title: 1,
          description: 1,
          imageTopic: 1,
          categoryId: '$cat._id',
          categoryName: '$cat.name',
          createdBy: '$create.name',
          updatedBy: '$update.name',
          keyWordSeo: 1,
          descriptionSeo: 1,
          status: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ]);

    return {
      data,
      total: (await this.articles.countDocuments()) ?? 0,
    };
  }

  async getContentById(id: string): Promise<IArticle> {
    return this.articles.findById(id);
  }
  
  async update(articleId: string, model: ArticleDto): Promise<IArticle> {
    if (articleId)
      return this.articles.findByIdAndUpdate({ _id: articleId }, model, {
        new: true,
      });
    else return await this.articles.create({ ...model });
  }

  async delete(articleId: string): Promise<void> {
    this.articles.deleteOne({ _id: articleId });
  }
}
