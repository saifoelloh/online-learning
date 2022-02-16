import _ from "lodash";
import HttpResponse from "../../helpers/http-response";
import JsonWebToken from "../../helpers/jsonwebtoken";
import UserRepository from "../repositories/user.repository";
import { NextFunction, Request, Response } from "express";
import { ComparePassword } from "../../helpers/password";
import { USER_ROLE } from "../../types/user";

class AuthHandler {
  userRepository: UserRepository;
  jsonWebToken: JsonWebToken;

  constructor() {
    this.jsonWebToken = new JsonWebToken();
    this.userRepository = new UserRepository();
  }

  loginMw = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await this.userRepository.getBy({
      email,
    });

    if (_.isEmpty(user)) {
      return HttpResponse(res)(404);
    }

    const hashPassword = user.get("password") as string;
    if (!ComparePassword(password, hashPassword)) {
      return HttpResponse(res)(401);
    }

    const userId = user.get("id") as string;
    const role = user.get("role") as USER_ROLE;
    const token = this.jsonWebToken.generateToken(
      { userId, role },
      { expiresIn: "1h", algorithm: "RS256" }
    );

    return HttpResponse(res)(200, {
      data: user,
      cookie: {
        name: "token",
        value: token,
        opt: {
          httpOny: true,
          maxAge: 10 * Math.pow(60, 2),
          sameSite: true,
        },
      },
    });
  };

  checkRouteMw =
    (roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
      const { user } = req.locals;
      if (!roles.includes(user.role)) {
        return HttpResponse(res)(401);
      }

      next();
    };
}

export default AuthHandler;
