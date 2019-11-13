import { BaseContext } from "koa";
import ProductService from "./service";
import Util from "../utils/util";
import SecondCategoryService from "../second_category/service";
import Product from "../entities/product";
import * as path from 'path';

export default class ProductController {

  public static async getProducts(ctx: BaseContext) {
    const querys = ctx.query;
    const name = querys.name;
    const secondCategoryId = querys.secondCategoryId;
    const [offset, limit] = Util.toPageParams(querys);
    
    const [products, total] = await ProductService.getProducts({offset, limit, name, secondCategoryId})
    ctx.status = 200;
    ctx.body = {products, total};
  }

  public static async getProductById(ctx: BaseContext) {
    ctx.status = 200;
    ctx.body = await ProductService.getProductById(ctx.params.id);
  }

  public static async getProductByName(ctx: BaseContext) {
    ctx.status = 200;
    const dr = await ProductService.getProductByName(ctx.params.name);
    ctx.body = dr;
  }
  
  public static async addProduct(ctx: BaseContext) {
    const bodyData = ctx.req.body;
    const imageUrl = ctx.req.file.path;
    const secondCategory = await SecondCategoryService.getSecondCategoryById(bodyData.secondCategoryId);
    console.log(bodyData);
    console.log(imageUrl);
    if (!secondCategory) {
      ctx.status = 400; 
      ctx.body = {
        error_code: 'M.2001',
        error_msg: 'The category is not exits by '+bodyData.secondCategoryId+' query'
      };
    } else {
      ctx.status = 200;
      const product = new Product();
      product.isHot = bodyData.isHot;
      product.name = bodyData.name;
      product.price = bodyData.price;
      product.promotionPrice = bodyData.promotionPrice;
      product.remark = bodyData.remark;
      product.secondCategory = secondCategory; 
      product.imageUrl = imageUrl.substr(imageUrl.indexOf('uploads'));
      ctx.body = await ProductService.addAndUpdateProduct(product);
    }
  }

  public static async updateProduct(ctx: BaseContext) {
    const findProduct = await ProductService.getProductById(ctx.params.id);
    if(!findProduct) {
      ctx.status = 400;
      ctx.body = 'Product is not exists!'
    } else {
      ctx.status = 200; 
      const productBody = ctx.req.body;
      const imageUrl = ctx.req.file.path;
      productBody.imageUrl =imageUrl.substr(imageUrl.indexOf('uploads'));
      const removeImgUrl = findProduct.imageUrl;
      const updateProduct = await ProductService.addAndUpdateProduct(Object.assign(findProduct, productBody));
      Util.removeFile(ProductController.getImgPath(removeImgUrl));
      ctx.body = updateProduct;
    }
  }

  public static async deleteProduct(ctx: BaseContext) {
    const findProduct = await ProductService.getProductById(ctx.params.id);
    if(!findProduct) {
      ctx.status = 400;
      ctx.body = 'Product is not exists!'
    } else {
      ctx.status = 204;
      Util.removeFile(ProductController.getImgPath(findProduct.imageUrl));
      await ProductService.deleteProduct(findProduct);
    }
  }

  public static getImgPath(imageUrl: string) {
    return path.join(__dirname + '/..', 'static' , imageUrl);
  }
}