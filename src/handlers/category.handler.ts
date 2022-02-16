import { NextFunction, Request, Response } from "express";
import _ from "lodash";

import HttpResponse from "../../helpers/http-response";
import CategoryRepository from "../repositories/category.repository";

class CourseHandler {
  categoryRepository: CategoryRepository;

  constructor() {
    this.categoryRepository = new CategoryRepository();
  }

  getCategoriesMw = async (req: Request, res: Response) => {
    const query = !_.isEmpty(req.query) ? req.query : {};
    const { rows, count } = await this.categoryRepository.getAllAndCount(
      query,
      {
        attributes: {
          exclude: ["createdAt", "updatedAt", "deletedAt"],
        },
      }
    );

    return HttpResponse(res)(200, { data: { products: rows, total: count } });
  };

  storeCategoryMw = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category = await this.categoryRepository.storeData(req.body);
      req.locals = { category };
      next();
    } catch (e) {
      console.log("category.handler->storeCategoryMw: ", e);
      return HttpResponse(res)(409);
    }
  };

  getCategoryByIdMw = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const category = await this.categoryRepository.getBy(
      { id },
      {
        attributes: {
          exclude: ["createdAt", "deletedAt"],
        },
      }
    );

    if (_.isEmpty(category)) {
      return HttpResponse(res)(404);
    }

    req.locals = { category };
    next();
  };

  updateCategoryByIdMw = async (req: Request, res: Response) => {
    try {
      const { category } = req.locals;
      await this.categoryRepository.updateBy({ id: category.id }, req.body);
      return HttpResponse(res)(201);
    } catch (e) {
      return HttpResponse(res)(400);
    }
  };

  deleteCategoryByIdMw = async (req: Request, res: Response) => {
    try {
      const { category } = req.locals;
      await this.categoryRepository.deleteBy({ id: category.id });
      return HttpResponse(res)(201);
    } catch (e) {
      return HttpResponse(res)(400);
    }
  };

  returnCategoryMw = (req: Request, res: Response) => {
    HttpResponse(res)(200, { data: req.locals.category });
  };
}

export default CourseHandler;
