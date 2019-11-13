import { getRepository } from "typeorm";
import Category from "../entities/category";

export default class CategoryService {

  public static async getCategories({offset = 0, limit = 5, name = ''}) {
    return getRepository(Category)
            .createQueryBuilder('category')
            .where('category.name like :name', {name: `%${name}%`})
            .skip(offset).take(limit).getManyAndCount();
  }

  public static async getCategoryById(id: string) {
    return getRepository(Category).findOne(id);
  }

  public static async getCategoryByName(name: string) {
    return getRepository(Category).findOne({name});
  }

  public static async addAndUpdateCategory(category: Category) {
    return getRepository(Category).save(category);
  }

  public static async deleteCategory(category: Category) {
    return getRepository(Category).remove(category);
  }
}