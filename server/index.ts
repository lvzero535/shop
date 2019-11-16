import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import * as Static from 'koa-static';
import * as koaSession from 'koa-session';
import * as path from 'path';
import * as Cors from 'koa2-cors';


import { createConnection } from 'typeorm';
import User from './entities/user';
import Category from './entities/category';
import routes from './routes';
import SecondCategory from './entities/second_category';
import Product from './entities/product';
import Manager from './entities/manager';
// 配置
const session_signed_key = ["some secret hurr"];  // 这个是配合signed属性的签名key
const session_config = {
    key: 'SESSIOND_ID', /**  cookie的key。 (默认是 koa:sess) */
    maxAge: 1000 * 60 * 60 * 24,   /**  session 过期时间，以毫秒ms为单位计算 。*/
    autoCommit: true, /** 自动提交到响应头。(默认是 true) */
    overwrite: true, /** 是否允许重写 。(默认是 true) */
    httpOnly: true, /** 是否设置HttpOnly，如果在Cookie中设置了"HttpOnly"属性，那么通过程序(JS脚本、Applet等)将无法读取到Cookie信息，这样能有效的防止XSS攻击。  (默认 true) */
    signed: false, /** 是否签名。(默认是 true) */
    rolling: true, /** 是否每次响应时刷新Session的有效期。(默认是 false) */
    renew: false, /** 是否在Session快过期时刷新Session的有效期。(默认是 false) */
};
createConnection({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "123456",
  database: "shop",
  entities: [
    User, Category, SecondCategory, Product, Manager
  ],
  synchronize: true,
  logging: false
}).then(connection => {
  const staticPath = './static'
  const app = new Koa();
  // app.keys = session_signed_key;
  app.use(koaSession(session_config, app));
  app.use(Static(
    path.join(__dirname, staticPath)
  ));
  app.use(Cors({
    origin: (ctx) => {
      if (ctx.url === '/test') {
        return false;
      }
      return 'http://localhost:4200';
    },
    allowMethods: ['OPTIONS', 'GET', 'PUT', 'POST', 'DELETE'],
    allowHeaders: ['x-requested-with', 'accept', 'origin', 'content-type'],
    credentials: true,
  }));
  app.use(async (ctx, next) => {
    if ( ctx.method === 'OPTIONS' || ctx.path === '/rest/v1.0/login') {
      await next();
      return;
    }
    const key = ctx.cookies.get('SESSIOND_ID');
    if (!key) {
      ctx.status = 401;
      ctx.body = 'unauth';
    } else {
      await next();
    }
    // await next();
  });
  app.use(bodyParser());
  const router = new Router();
  router.use(routes.routes());
  app.use(router.routes()).use(router.allowedMethods());
  
  app.listen(8888, () => {
    console.log('starting -------')
  })
}).catch(err => console.log('typeorm connect failed,', err))



