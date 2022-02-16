import { Router } from "express";
import CourseHandler from "../handlers/course.handler";
import UserHandler from "../handlers/user.handler";

class CourseRouter {
  name = "course";
  router = Router();
  courseHandler = new CourseHandler();
  userHandler = new UserHandler();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get("/", this.courseHandler.getCoursesMw);
    this.router.post(
      "/",
      this.courseHandler.storeCourseMw,
      this.courseHandler.returnCourseMw
    );
    this.router.get(
      "/coordinator/:id",
      this.courseHandler.getCoursesByCoordinatorIdMw
    );
    this.router.get(
      "/:id",
      this.courseHandler.getCourseByIdMw,
      this.courseHandler.returnCourseMw
    );
    this.router.put(
      "/:id",
      this.courseHandler.getCourseByIdMw,
      this.courseHandler.updateCourseByIdMw
    );
    this.router.delete(
      "/:id",
      this.courseHandler.getCourseByIdMw,
      this.courseHandler.deleteCourseByIdMw
    );
  }
}

export default CourseRouter;
