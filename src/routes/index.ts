import { Router } from "express";
import AuthRouter from "./auth.router";
import CategoryRouter from "./category.router";
import CourseRouter from "./course.router";
import UserRouter from "./user.router";

class MainRouter {
  public routes = [
    new UserRouter(),
    new CategoryRouter(),
    new CourseRouter(),
    new AuthRouter(),
  ];
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    for (const r of this.routes) {
      this.router.use(`/${r.name}`, r.router);
    }
  }
}

export default MainRouter;
