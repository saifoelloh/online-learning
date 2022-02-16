import { NextFunction, Request, Response } from "express";
import _ from "lodash";
import { Op } from "sequelize";

import HttpResponse from "../../helpers/http-response";
import CourseRepository from "../repositories/course.repository";
import UserRepository from "../repositories/user.repository";

class CourseHandler {
  courseRepository: CourseRepository;
  userRepository: UserRepository;

  constructor() {
    this.courseRepository = new CourseRepository();
    this.userRepository = new UserRepository();
  }

  getCoursesMw = async (req: Request, res: Response) => {
    const query = !_.isEmpty(req.query) ? req.query : {};

    const { rows, count } = await this.courseRepository.getAllAndCount(query, {
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt"],
      },
      include: "coordinator",
      where: { price: { [Op.gt]: 0 } },
    });

    return HttpResponse(res)(200, { data: { products: rows, total: count } });
  };

  storeCourseMw = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const course = await this.courseRepository.storeData(req.body);
      req.locals = { course };
      next();
    } catch (e) {
      console.log("course.handler->storeCourseMw: ", e);
      return HttpResponse(res)(409);
    }
  };

  getCourseByIdMw = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const course = await this.courseRepository.getBy(
      { id },
      {
        attributes: {
          exclude: ["createdAt", "deletedAt"],
        },
      }
    );

    if (_.isEmpty(course)) {
      return HttpResponse(res)(404);
    }

    req.locals = { course };
    next();
  };

  getCoursesByCoordinatorIdMw = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await this.userRepository.getBy(
      { id },
      {
        attributes: {
          exclude: ["password", "createdAt", "deletedAt"],
        },
        include: "courses",
      }
    );

    if (_.isEmpty(data)) {
      return HttpResponse(res)(404);
    }

    return HttpResponse(res)(200, { data });
  };

  updateCourseByIdMw = async (req: Request, res: Response) => {
    try {
      const { course } = req.locals;
      await this.courseRepository.updateBy({ id: course.id }, req.body);
      return HttpResponse(res)(201);
    } catch (e) {
      return HttpResponse(res)(400);
    }
  };

  deleteCourseByIdMw = async (req: Request, res: Response) => {
    try {
      const { course } = req.locals;
      await this.courseRepository.deleteBy({ id: course.id });
      return HttpResponse(res)(201);
    } catch (e) {
      return HttpResponse(res)(400);
    }
  };

  returnCourseMw = (req: Request, res: Response) => {
    HttpResponse(res)(200, { data: req.locals.course });
  };
}

export default CourseHandler;
