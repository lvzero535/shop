import * as Router from 'koa-router';
import userRoute from './user/route';
import categoryRoute from './category/route';
import secondCategoryRoute from './second_category/route';
import productRoute from './product/route';
import managerRoute from './manager/route';

const routes = new Router({
  prefix: '/rest/v1.0'
});

routes.use(userRoute.routes());
routes.use(categoryRoute.routes());
routes.use(secondCategoryRoute.routes());
routes.use(productRoute.routes());
routes.use(managerRoute.routes());

export default routes;