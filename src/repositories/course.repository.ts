import RootRepository from "./root.repository";
import DB from "../databases/models";

class CourseRepository extends RootRepository {
  constructor() {
    super(DB.Course);
  }
}

export default CourseRepository;
