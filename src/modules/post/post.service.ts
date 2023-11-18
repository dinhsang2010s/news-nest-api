import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pagination } from 'src/dtos/pagination';
import { PostDto, QueryPagination } from 'src/dtos/request.dtos';
import { IPost } from 'src/interfaces/post';
import { Post } from 'src/schemas/post.schams';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name)
    private posts: Model<IPost>,
  ) {}

  async getPagination(query: QueryPagination): Promise<Pagination<IPost[]>> {
    const { offset, pageSize, orderBy } = query;
    const data = await this.posts.aggregate([
      { $match: { status: 1 } },
      { $skip: 0 },
      { $limit: 10 },
      { $sort: { createdAt: 1 } },
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
          as: 'categoryName',
        },
      },
    ]);

    return {
      data: [],
      total: 0,
    };
  }

  async add(model: PostDto): Promise<IPost> {
    return await this.posts.create({ ...model });
  }

  async update(postId: string, model: PostDto): Promise<IPost> {
    return await this.posts.findOneAndUpdate({ _id: postId }, { ...model });
  }

  async delete(postId: string): Promise<void> {
    await this.posts.deleteOne({ _id: postId });
  }
}
