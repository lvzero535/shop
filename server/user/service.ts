import { getRepository } from "typeorm";
import User from "../entities/user";

export default class UserService {

  public static async getUsers({offset = 0, limit = 5, username = ''}) {
    return getRepository(User)
            .createQueryBuilder('user')
            .where('user.username like :name', {name: `%${username}%`})
            .skip(offset).take(limit).getManyAndCount();
  }

  public static async getUserById(id: string) {
    return getRepository(User).findOne(id);
  }

  public static async addAndUpdateUser(user: User) {
    return getRepository(User).save(user);
  }

  public static async deleteUser(user: User) {
    return getRepository(User).remove(user);
  }
}