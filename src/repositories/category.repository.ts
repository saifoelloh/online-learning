import RootRepository from "./root.repository";
import DB from "../databases/models";

class CategoryRepository extends RootRepository {
  constructor() {
    super(DB.Category);
  }
}

export default CategoryRepository;
