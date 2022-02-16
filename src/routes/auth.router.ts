import { Router } from "express";
import AuthHandler from "../handlers/auth.handler";

class AuthRouter {
  name = "auth";
  router = Router();
  authHandler = new AuthHandler();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post("/login", this.authHandler.loginMw);
  }
}

export default AuthRouter;
