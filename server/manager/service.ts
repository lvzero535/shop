import { getRepository } from "typeorm";
import Manager from "../entities/manager";

export default class ManagerService {

  public static async getManagers({offset = 0, limit = 5, username = ''}) {
    return getRepository(Manager)
            .createQueryBuilder('manager')
            .select(['manager.id', 'manager.username', 'manager.email', 'manager.createdDate', 'manager.role'])
            .where('manager.username like :name', {name: `%${username}%`})
            .skip(offset).take(limit).getManyAndCount();
  }

  public static async getManagerById(id: string) {
    return getRepository(Manager).findOne(id);
  }

  public static async addAndUpdateManager(manager: Manager) {
    return getRepository(Manager).save(manager);
  }

  public static async deleteManager(manager: Manager) {
    return getRepository(Manager).remove(manager);
  }
  public static async login(username: string, password: string) {
    return getRepository(Manager)
            .createQueryBuilder('manager')
            .where('manager.username = :username', {username})
            .andWhere('manager.password = :password', {password})
            .getOne();
  }
}