import { getRepository } from "typeorm";
import SecondCategory from "../entities/second_category";

export default class SecondCategoryService {

  public static async getSecondCategories({offset = 0, limit = 5, name = '', id = ''}) {
    return getRepository(SecondCategory)
            .createQueryBuilder('categoryCategory')
            .leftJoinAndSelect('categoryCategory.category', 'categorys')
            .where('categoryCategory.name like :name', {name: `%${name}%`})
            .andWhere('categorys.id like :id', {id: `%${id}%`})
            .skip(offset).take(limit).getManyAndCount();
  }

  public static async getSecondCategoryById(id: string) {
    return getRepository(SecondCategory).findOne(id);
  }

  public static async getSecondCategoryByName(name: string) {
    return getRepository(SecondCategory).findOne({name});
  }

  public static async addAndUpdateSecondCategory(categoryCategory: SecondCategory) {
    return getRepository(SecondCategory).save(categoryCategory);
  }

  public static async deleteSecondCategory(categoryCategory: SecondCategory) {
    return getRepository(SecondCategory).remove(categoryCategory);
  }
}