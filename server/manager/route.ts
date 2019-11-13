import * as Router from 'koa-router';
import controller from './controller';
const router = new Router();

router.get('/managers', controller.getManagers);
router.get('/managers/:id', controller.getManagerById);
router.post('/managers', controller.addManager);
router.put('/managers/:id', controller.updateManager);
router.delete('/managers/:id', controller.deleteManager);
router.post('/login', controller.login);

export default router;