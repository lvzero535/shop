import { BaseContext } from "koa";
import UserService from "./service";
import User from "../entities/user";
import Util from "../utils/util";

export default class UserController {

  public static async getUsers(ctx: BaseContext) {
    const querys = ctx.query;
    const username = querys.username;
    const [offset, limit] = Util.toPageParams(querys);
    
    const [users, total] = await UserService.getUsers({offset, limit, username})
    ctx.status = 200;
    ctx.body = {users, total};
  }

  public static async getUserById(ctx: BaseContext) {
    ctx.status = 200;
    ctx.body = await UserService.getUserById(ctx.params.id);
  }
  
  public static async addUser(ctx: BaseContext) {
    const user: User = ctx.request.body;
    console.log(ctx.request.body);
    ctx.status = 200; 
    ctx.body = await UserService.addAndUpdateUser(user);
  }

  public static async updateUser(ctx: BaseContext) {
    const findUser = await UserService.getUserById(ctx.params.id);
    if(!findUser) {
      ctx.status = 400;
      ctx.body = 'user is not exists!'
    } else {
      ctx.status = 200; 
      ctx.body = await UserService.addAndUpdateUser(Object.assign(findUser, ctx.request.body));
    }
  }

  public static async deleteUser(ctx: BaseContext) {
    const findUser = await UserService.getUserById(ctx.params.id);
    if(!findUser) {
      ctx.status = 400;
      ctx.body = 'user is not exists!'
    } else {
      ctx.status = 204; 
      await UserService.deleteUser(findUser);
    }
  }
}