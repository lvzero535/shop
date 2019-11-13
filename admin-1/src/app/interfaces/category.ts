export interface Category {
  id?: string;
  name: string;
  hot?: boolean;
  createdDate?: Date;
}

export interface CategoriesResp {
  categories: Array<Category>;
  total: number;
}
