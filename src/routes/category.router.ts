import { Router } from "express";
import CategoryHandler from "../handlers/category.handler";

class CategoryRouter {
  name = "category";
  router = Router();
  categoryHandler = new CategoryHandler();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get("/", this.categoryHandler.getCategoriesMw);
    this.router.post(
      "/",
      this.categoryHandler.storeCategoryMw,
      this.categoryHandler.returnCategoryMw
    );
    this.router.get(
      "/:id",
      this.categoryHandler.getCategoryByIdMw,
      this.categoryHandler.returnCategoryMw
    );
    this.router.put(
      "/:id",
      this.categoryHandler.getCategoryByIdMw,
      this.categoryHandler.updateCategoryByIdMw
    );
    this.router.delete(
      "/:id",
      this.categoryHandler.getCategoryByIdMw,
      this.categoryHandler.deleteCategoryByIdMw
    );
  }
}

export default CategoryRouter;
