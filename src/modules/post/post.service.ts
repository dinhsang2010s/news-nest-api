import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pagination } from 'src/dtos/pagination';
import { PostDto } from 'src/dtos/request.dtos';
import { IPost } from 'src/interfaces/post';
import { Post } from 'src/schemas/post.schams';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name)
    private posts: Model<IPost>,
  ) {}

  async getPagination(): Promise<Pagination<IPost[]>> {
    return {
      data: [],
      total: 0,
    };
  }

  async add(model: PostDto): Promise<void> {
    await this.posts.create(model);
  }

  async update(catId: string, model: PostDto): Promise<void> {
    await this.posts.findOneAndUpdate({ _id: catId }, model);
  }

  async delete(catId: string): Promise<void> {
    await this.posts.deleteOne({ _id: catId });
  }
}
