import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import * as Static from 'koa-static';
import * as koaSession from 'koa-session';
import * as path from 'path';
// import _ from 'koa-mysql-session';
import * as sess from 'koa-session-minimal';

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
  const session = koaSession(session_config, app);
  // app.keys = session_signed_key;
  app.use(session);
  app.use(Static(
    path.join(__dirname, staticPath)
  ))
  app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    // 设置所允许的HTTP请求方法
    ctx.set('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, DELETE');
    ctx.set('Access-Control-Allow-Credentials', 'true');
    // 字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段.
    ctx.set('Access-Control-Allow-Headers', 'x-requested-with, x-auth-token, accept, origin, content-type')
    if ( ctx.method === 'OPTIONS' || ctx.path === '/rest/v1.0/login') {
      await next();
      return;
    }
    const key = ctx.cookies.get('SESSIOND_ID');
    console.log(key);
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



