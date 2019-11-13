import { BaseContext } from "koa";
import CategoryService from "./service";
import Util from "../utils/util";

export default class CategoryController {

  public static async getCategories(ctx: BaseContext) {
    const querys = ctx.query;
    const name = querys.name;
    const [offset, limit] = Util.toPageParams(querys);
    
    const [categories, total] = await CategoryService.getCategories({offset, limit, name})
    ctx.status = 200;
    ctx.body = {categories, total};
  }

  public static async getCategoryById(ctx: BaseContext) {
    ctx.status = 200;
    ctx.body = await CategoryService.getCategoryById(ctx.params.id);
  }

  public static async getCategoryByName(ctx: BaseContext) {
    ctx.status = 200;
    const dr = await CategoryService.getCategoryByName(ctx.params.name);
    console.log(dr);
    ctx.body = dr;
  }
  
  public static async addCategory(ctx: BaseContext) {
    const categorys = ctx.request.body;
    console.log(ctx.request.body);
    ctx.status = 200; 
    ctx.body = await CategoryService.addAndUpdateCategory(categorys);
  }

  public static async updateCategory(ctx: BaseContext) {
    const findCategory = await CategoryService.getCategoryById(ctx.params.id);
    if(!findCategory) {
      ctx.status = 400;
      ctx.body = 'Category is not exists!'
    } else {
      ctx.status = 200; 
      ctx.body = await CategoryService.addAndUpdateCategory(Object.assign(findCategory, ctx.request.body));
    }
  }

  public static async deleteCategory(ctx: BaseContext) {
    const findCategory = await CategoryService.getCategoryById(ctx.params.id);
    if(!findCategory) {
      ctx.status = 400;
      ctx.body = 'Category is not exists!'
    } else {
      ctx.status = 204; 
      await CategoryService.deleteCategory(findCategory);
    }
  }
}