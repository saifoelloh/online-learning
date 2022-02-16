import _ from "lodash";
import HttpCodes from "./http-codes";

class HttpError extends Error {
  declare statusCode: number;
  constructor(statusCode: number, message: string = "", name: string = "") {
    super();
    const currentStatus = HttpCodes[statusCode];

    this.name = _.isEmpty(name) ? currentStatus.name : name;
    this.message = _.isEmpty(message) ? currentStatus.message : message;
    this.statusCode = statusCode;
  }
}

export default HttpError;
