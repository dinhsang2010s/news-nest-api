import {
  CategoryDto,
  QueryPaginationDto,
} from 'src/dtos/request.dtos/request.dtos';
import { ICategory } from 'src/dtos/response.dtos/category';
import { Pagination } from 'src/dtos/response.dtos/pagination';

export interface CategoryInterface {
  getPagination(query: QueryPaginationDto): Promise<Pagination<ICategory[]>>;
  update(catId: string, model: CategoryDto): Promise<ICategory>;
  delete(catId: string): Promise<void>;
}
