import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";

import HttpError from "../helpers/http-error";
import MainRouter from "./routes";
import ErrorCatcher from "../helpers/error-catcher";

dotenv.config();

const app = express();
const { APP_NAME, APP_PORT, APP_VERSION } = process.env;
const mainRoute = new MainRouter();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(`/api/${APP_VERSION}`, mainRoute.router);
app.use("*", (req: Request, res: Response, next: NextFunction) =>
  next(new HttpError(404))
);
app.use(ErrorCatcher);

app.listen(APP_PORT, () => {
  console.log(`${APP_NAME} runnin on port: ${APP_PORT}`);
});
