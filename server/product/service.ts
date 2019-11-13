import { getRepository } from "typeorm";
import Product from "../entities/product";

export default class ProductService {

  public static async getProducts({offset = 0, limit = 5, name = '', secondCategoryId = ''}) {
    return getRepository(Product)
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.secondCategory', 'secondCategory')
            .where('product.name like :name', {name: `%${name}%`})
            .andWhere('secondCategory.id like :id', {id: `%${secondCategoryId}%`})
            .skip(offset).take(limit).getManyAndCount();
  }

  public static async getProductById(id: string) {
    return getRepository(Product)
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.secondCategory', 'secondCategory')
            .where('product.id = :id', {id}).getOne();
  }

  public static async getProductByName(name: string) {
    return getRepository(Product).findOne({name});
  }

  public static async addAndUpdateProduct(product: Product) {
    return getRepository(Product).save(product);
  }

  public static async deleteProduct(product: Product) {
    return getRepository(Product).remove(product);
  }
}