import * as Router from 'koa-router';
import controller from './controller';
const router = new Router();

router.get('/secondcategories', controller.getSecondCategories);
router.get('/secondcategories/:id', controller.getSecondCategoryById);
router.get('/secondcategories/name/:name', controller.getSecondCategoryByName);
router.post('/secondcategories', controller.addSecondCategory);
router.put('/secondcategories/:id', controller.updateSecondCategory);
router.delete('/secondcategories/:id', controller.deleteSecondCategory);

export default router;