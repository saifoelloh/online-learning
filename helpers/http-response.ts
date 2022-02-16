import _ from "lodash";
import { Response } from "express";

const HttpResponse =
  (res: Response) =>
  (code: number, options: any = {}) => {
    if (!_.isEmpty(options.cookie)) {
      const { name, value, opt } = options.cookie;
      return res.status(code).cookie(name, value, opt).json(options.data);
    }

    return res.status(code).json(options.data);
  };

export default HttpResponse;
