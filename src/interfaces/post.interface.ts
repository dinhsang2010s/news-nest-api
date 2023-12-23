import {
  PostDto,
  QueryPaginationDto,
} from 'src/dtos/request.dtos/request.dtos';
import { Pagination } from 'src/dtos/response.dtos/pagination';
import { IPost } from 'src/dtos/response.dtos/post';

export interface PostInterface {
  getPagination(query: QueryPaginationDto): Promise<Pagination<IPost[]>>;
  update(postId: string, model: PostDto): Promise<IPost>;
  delete(postId: string): Promise<void>;
}
