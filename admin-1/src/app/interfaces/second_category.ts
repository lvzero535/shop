import { Category } from './category';

export interface SecondCategory {
  id?: string;
  name: string;
  isPulished?: boolean;
  createdDate?: Date;
  category?: Category;
}

export interface SecondCategoryResp {
  second_categories: Array<SecondCategory>;
  total: number;
}
