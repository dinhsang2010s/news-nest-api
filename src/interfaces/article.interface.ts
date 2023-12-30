import {
  ArticleDto,
  QueryPaginationDto,
} from 'src/dtos/request.dtos/request.dtos';
import { Pagination } from 'src/dtos/response.dtos/pagination';
import { IArticle } from 'src/dtos/response.dtos/article';

export interface ArticleInterface {
  getPagination(query: QueryPaginationDto): Promise<Pagination<IArticle[]>>;
  update(postId: string, model: ArticleDto): Promise<IArticle>;
  delete(postId: string): Promise<void>;
}
