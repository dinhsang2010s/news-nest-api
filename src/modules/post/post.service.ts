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

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name)
    private posts: Model<IPost>,
  ) {}

  async getPagination(query: QueryPaginationDto): Promise<Pagination<IPost[]>> {
    const { offset, pageSize, orderBy } = query;
    const sortBy = orderBy?.split(',');

    const data = await this.posts.aggregate([
      { $match: { status: 1 } },
      { $skip: parseInt(offset) ?? 0 },
      { $limit: parseInt(pageSize) ?? 10 },
      {
        $sort: { [sortBy?.[0] ?? 'createdAt']: sortBy?.[1] === 'asc' ? 1 : -1 },
      },
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
                      $eq: ['$_id', '$createdBy'],
                    },
                  ],
                },
              },
            },
          ],
          as: 'user',
        },
      },
      {
        $unwind: {
          path: '$user',
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
          categoryName: '$cat.name',
          userName: '$user.name',
          createdAt: 1,
        },
      },
    ]);

    return {
      data,
      total: (await this.posts.countDocuments()) ?? 0,
    };
  }

  async add(model: PostDto): Promise<IPost> {
    return await this.posts.create(model);
  }

  async update(postId: string, model: PostDto): Promise<IPost> {
    return await this.posts.findOneAndUpdate({ _id: postId }, model, {
      new: true,
    });
  }

  async delete(postId: string): Promise<void> {
    await this.posts.deleteOne({ _id: postId });
  }
}
