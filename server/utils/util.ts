import * as fs from 'fs';

export default class Util {

  public static toInteger(param: any, defaultValue = 0): number {
    const p = parseInt(param, 10);
    return Number.isInteger(p) ? p : defaultValue;
  }

  public static toPageParams(querys: any, defaultPageSize = 10) {
    const limit = Util.toInteger(querys.pageSize, defaultPageSize);
    const offset = (Util.toInteger(querys.pageNum, 1) -1) * limit;
    return [offset, limit]
  }

  public static removeFile(path: string) {
    console.log(path);
    fs.unlinkSync(path);
  }
} 