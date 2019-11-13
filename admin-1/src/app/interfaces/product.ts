import { SecondCategory } from './second_category';

export interface Prodcut {
  id?: string;
  name: string;
  isHot?: boolean;
  remark?: string;
  price?: number;
  promotionPrice?: number;
  createdDate?: Date;
  imageUrl?: string;
  secondCategory?: SecondCategory;
}

export interface ProdcutResp {
  products: Array<Prodcut>;
  total: number;
}
