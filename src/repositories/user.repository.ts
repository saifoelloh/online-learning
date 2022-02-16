import RootRepository from "./root.repository";
import DB from "../databases/models";

class UserRepository extends RootRepository {
  constructor() {
    super(DB.User);
  }
}

export default UserRepository;
