import * as Router from 'koa-router';
import controller from './controller';
const router = new Router();

router.get('/categories', controller.getCategories);
router.get('/categories/:id', controller.getCategoryById);
router.get('/categories/name/:name', controller.getCategoryByName);
router.post('/categories', controller.addCategory);
router.put('/categories/:id', controller.updateCategory);
router.delete('/categories/:id', controller.deleteCategory);

export default router;