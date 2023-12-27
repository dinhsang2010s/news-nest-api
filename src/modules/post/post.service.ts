import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pagination } from 'src/dtos/response.dtos/pagination';
import {
  PostDto,
  QueryPaginationDto,
} from 'src/dtos/request.dtos/request.dtos';
import { IPost } from 'src/dtos/response.dtos/post';
import { Post } from 'src/schemas/post.schams';
import { PostInterface } from 'src/interfaces/post.interface';

@Injectable()
export class PostService implements PostInterface {
  constructor(
    @InjectModel(Post.name)
    private posts: Model<IPost>,
  ) {}

  async getPagination(query: QueryPaginationDto): Promise<Pagination<IPost[]>> {
    const { offset, pageSize, orderBy, q } = query;

    const searchQ = {
      title: {
        $regex: q,
        $options: 'i',
      },
    };

    const data = await this.posts.aggregate([
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
          content: 1,
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
      total: (await this.posts.countDocuments()) ?? 0,
    };
  }

  async getById(id: string): Promise<IPost> {
    return await this.posts.findById(id);
  }

  async update(postId: string, model: PostDto): Promise<IPost> {
    if (!postId || postId === '') return await this.posts.create({ ...model });

    return await this.posts.findOneAndUpdate({ _id: postId }, model, {
      new: true,
    });
  }

  async delete(postId: string): Promise<void> {
    await this.posts.deleteOne({ _id: postId });
  }
}
