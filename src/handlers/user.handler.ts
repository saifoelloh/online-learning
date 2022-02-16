import { NextFunction, Request, Response } from "express";
import _ from "lodash";

import { HashPassword } from "../../helpers/password";
import HttpResponse from "../../helpers/http-response";
import UserRepository from "../repositories/user.repository";

class UserHandler {
  userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  getUsersMw = async (req: Request, res: Response) => {
    const query = !_.isEmpty(req.query) ? req.query : {};
    const { rows, count } = await this.userRepository.getAllAndCount(query, {
      attributes: {
        exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
      },
    });
    return HttpResponse(res)(200, { data: { products: rows, total: count } });
  };

  storeUserMw = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userRepository.storeData({
        ...req.body,
        password: HashPassword(req.body.password),
      });

      req.locals = { user };
      next();
    } catch (e) {
      console.log("user.handler->storeUserMw: ", e);
      return HttpResponse(res)(409);
    }
  };

  getUserByIdMw = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const user = await this.userRepository.getBy(
      { id },
      {
        attributes: {
          exclude: ["password", "createdAt", "deletedAt"],
        },
      }
    );

    if (_.isEmpty(user)) {
      return HttpResponse(res)(404);
    }

    req.locals = { user };
    next();
  };

  udpateUserByIdMw = async (req: Request, res: Response) => {
    try {
      const { user } = req.locals;
      await this.userRepository.updateBy({ id: user.id }, req.body);
      return HttpResponse(res)(201);
    } catch (e) {
      return HttpResponse(res)(400);
    }
  };

  deleteUserByIdMw = async (req: Request, res: Response) => {
    try {
      const { user } = req.locals;
      await this.userRepository.deleteBy({ id: user.id });
      return HttpResponse(res)(201);
    } catch (e) {
      return HttpResponse(res)(400);
    }
  };

  getUserByBodyIdMw = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { coordinatorId: id } = req.body;
    const user = await this.userRepository.getBy(
      { id },
      {
        attributes: {
          exclude: ["password", "createdAt", "deletedAt"],
        },
      }
    );

    if (_.isEmpty(user)) {
      return HttpResponse(res)(404);
    }

    req.locals = { user };
    next();
  };

  returnUserMw = (req: Request, res: Response) => {
    HttpResponse(res)(200, { data: req.locals.user });
  };
}

export default UserHandler;
