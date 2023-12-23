import { CategoryDto } from 'src/dtos/request.dtos/request.dtos';
import { ICategory } from 'src/dtos/response.dtos/category';

export interface CategoryInterface {
  getAll(): Promise<ICategory[]>;
  update(catId: string, model: CategoryDto): Promise<ICategory>;
  delete(catId: string): Promise<void>;
}
