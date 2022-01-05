import { BaseContext } from "koa";
import ManagerService from "./service";
import Manager from "../entities/manager";
import Util from "../utils/util";

export default class ManagerController {

  public static async getManagers(ctx: BaseContext) {
    const querys = ctx.query;
    const username = querys.username;
    const [offset, limit] = Util.toPageParams(querys);
    
    const [managers, total] = await ManagerService.getManagers({offset, limit, username})
    ctx.status = 200;
    ctx.body = {managers, total};
  }

  public static async getManagerById(ctx: BaseContext) {
    ctx.status = 200;
    ctx.body = await ManagerService.getManagerById(ctx.params.id);
  }
  
  public static async addManager(ctx: BaseContext) {
    const manager: Manager = ctx.request.body;
    manager.password = Util.crypto(manager.password);
    console.log(ctx.request.body);
    ctx.status = 200; 
    ctx.body = await ManagerService.addAndUpdateManager(manager);
  }

  public static async updateManager(ctx: BaseContext) {
    const findManager = await ManagerService.getManagerById(ctx.params.id);
    if(!findManager) {
      ctx.status = 400;
      ctx.body = 'user is not exists!'
    } else {
      const manager: Manager = ctx.request.body;
      manager.password = Util.crypto(manager.password);
      ctx.status = 200; 
      ctx.body = await ManagerService.addAndUpdateManager(Object.assign(findManager, manager));
    }
  }

  public static async deleteManager(ctx: BaseContext) {
    const findManager = await ManagerService.getManagerById(ctx.params.id);
    if(!findManager) {
      ctx.status = 400;
      ctx.body = 'user is not exists!'
    } else {
      ctx.status = 204; 
      await ManagerService.deleteManager(findManager);
    }
  }

  public static async login(ctx: BaseContext) {
    const {username, password} = ctx.request.body;
    const findManager = await ManagerService.login(username, Util.crypto(password));
    if(!findManager) {
      ctx.status = 400;
      ctx.body = {
        error_code: '401',
        error_msg: 'username or password is not correct!'
      }
    } else {
      ctx.status = 200; 
      ctx.session = findManager;
      ctx.body = findManager;
    }
  }
  public static async logout(ctx: BaseContext) {
    console.log('daaaaaa')
    ctx.session = null;
    ctx.status = 200;
    ctx.body = {
      msg: 'logout success'
    }
  }
}