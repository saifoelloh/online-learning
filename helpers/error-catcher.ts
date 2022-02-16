import { NextFunction, Request, RequestHandler, Response } from "express";
import _ from "lodash";
import HttpError from "./http-error";

const SyncErrorThrower = (handler: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      handler(req, res, next);
    } catch (e) {
      next(e || new HttpError(500));
    }
  };
};

const AsyncErrorThrower =
  (handler: RequestHandler) =>
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(handler(req, res, next)).catch(next);

/**
 * ErrorWrapperFactory
 * Wrap all function with error thrower so you don't need to handle it by your self
 */
interface HandlersInterface {
  [key: string]: RequestHandler;
}

function ErrorCatcher<T>(handlers: HandlersInterface): T {
  const result = _.reduce(
    handlers,
    (result: any, handler: RequestHandler, key: string) => {
      let wrapper = SyncErrorThrower;
      if (_.isEqual(handler.constructor.name, "AsyncFunction")) {
        wrapper = AsyncErrorThrower;
      }

      result[key] = wrapper(handler);
      return result;
    },
    {}
  );

  return result;
}
export default ErrorCatcher;
