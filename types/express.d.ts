import { Request } from "express";

export interface ReqType extends Request {
  locals: {
    [key: string]: any;
  };
}

export interface ReqCreation<Body> extends Request {
  body: Body | any;
  [key: string]: any;
}

