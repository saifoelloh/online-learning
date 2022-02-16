import { NextFunction, Request, Response } from "express";
import HttpCodes from "./http-codes";
import HttpError from "./http-error";
import HttpResponse from "./http-response";

const sequelizeErrorResponse = (name: string) => {
  let response = null;
  switch (name) {
    case "SequelizeValidationError":
      response = HttpCodes[400];
      break;
    case "SequelizeUniqueConstraintError":
      response = HttpCodes[409];
      break;
    case "TokenExpiredError":
      response = HttpCodes[401];
      break;
    default:
      response = HttpCodes[500];
      break;
  }

  return response;
};

const ErrorHandler = (
  error: HttpError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { statusCode = null, name } = error;
  console.log("[ERROR] ErrorHandler ", error);
  let data = error;
  if (!statusCode) {
    data = sequelizeErrorResponse(name);
  }

  return HttpResponse(res)(data.statusCode, { data });
};

export default ErrorHandler;
