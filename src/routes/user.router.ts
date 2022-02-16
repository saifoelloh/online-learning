import { Router } from "express";
import UserHandler from "../handlers/user.handler";

class UserRouter {
  public name = "user";
  public router = Router();
  public userHandler = new UserHandler();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get("/", this.userHandler.getUsersMw);
    this.router.post(
      "/",
      this.userHandler.storeUserMw,
      this.userHandler.returnUserMw
    );
    this.router.get(
      "/:id",
      this.userHandler.getUserByIdMw,
      this.userHandler.returnUserMw
    );
    this.router.put(
      "/:id",
      this.userHandler.getUserByIdMw,
      this.userHandler.udpateUserByIdMw
    );
    this.router.delete(
      "/:id",
      this.userHandler.getUserByIdMw,
      this.userHandler.deleteUserByIdMw
    );
  }
}

export default UserRouter;
