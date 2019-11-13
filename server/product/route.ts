import * as Router from 'koa-router';
import * as multer from 'koa-multer';

import controller from './controller';
const router = new Router();
const imgPath = 'server/static/uploads/product';
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, imgPath);
  },
  filename(req, file, cb) {
    const extName = file.originalname.substr(file.originalname.lastIndexOf('.'));
    cb(null, Date.now() + extName);
  }
});
const upload = multer({ storage });

router.get('/products', controller.getProducts);
router.get('/products/:id', controller.getProductById);
router.get('/products/name/:name', controller.getProductByName);
router.put('/products/:id', upload.single('file'), controller.updateProduct);
router.delete('/products/:id', controller.deleteProduct);
router.post('/products', upload.single('file'), controller.addProduct);

export default router;