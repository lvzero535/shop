import { BaseContext } from "koa";
import SecondCategoryService from "./service";
import Util from "../utils/util";
import CategoryService from "../category/service";
import SecondCategory from "../entities/second_category";

export default class SecondCategoryController {

  public static async getSecondCategories(ctx: BaseContext) {
    const querys = ctx.query;
    const name = querys.name;
    const id = querys.categoryId;
    const [offset, limit] = Util.toPageParams(querys);
    
    const [second_categories, total] = await SecondCategoryService.getSecondCategories({offset, limit, name, id})
    ctx.status = 200;
    ctx.body = {second_categories, total};
  }

  public static async getSecondCategoryById(ctx: BaseContext) {
    ctx.status = 200;
    ctx.body = await SecondCategoryService.getSecondCategoryById(ctx.params.id);
  }

  public static async getSecondCategoryByName(ctx: BaseContext) {
    ctx.status = 200;
    const dr = await SecondCategoryService.getSecondCategoryByName(ctx.params.name);
    console.log(dr);
    ctx.body = dr;
  }
  
  public static async addSecondCategory(ctx: BaseContext) {
    const secondCategorys = ctx.request.body;
    console.log(ctx.request.body);
    const category = await CategoryService.getCategoryById(secondCategorys.category_id);
    if (!category) {
      ctx.status = 400; 
      ctx.body = {
        error_code: 'M.2001',
        error_msg: 'The category is not exits by '+secondCategorys.category_id+' query'
      };
    } else {
      const cs = new SecondCategory();
      cs.category = category;
      cs.isPulished = secondCategorys.isPulished
      cs.name = secondCategorys.name;
      ctx.status = 200; 
      ctx.body = await SecondCategoryService.addAndUpdateSecondCategory(cs);
    }
  }

  public static async updateSecondCategory(ctx: BaseContext) {
    const findSecondCategory = await SecondCategoryService.getSecondCategoryById(ctx.params.id);
    if(!findSecondCategory) {
      ctx.status = 400;
      ctx.body = 'SecondCategory is not exists!'
    } else {
      ctx.status = 200; 
      ctx.body = await SecondCategoryService.addAndUpdateSecondCategory(Object.assign(findSecondCategory, ctx.request.body));
    }
  }

  public static async deleteSecondCategory(ctx: BaseContext) {
    const findSecondCategory = await SecondCategoryService.getSecondCategoryById(ctx.params.id);
    if(!findSecondCategory) {
      ctx.status = 400;
      ctx.body = 'SecondCategory is not exists!'
    } else {
      ctx.status = 204; 
      await SecondCategoryService.deleteSecondCategory(findSecondCategory);
    }
  }
}