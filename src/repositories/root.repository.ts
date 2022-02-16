import _ from "lodash";
import {
  BuildOptions,
  FindOptions,
  InferAttributes,
  InferCreationAttributes,
  Model,
  WhereOptions,
} from "sequelize";

type Conditions = {
  show: number;
  page: number;
  orderBy: keyof InferAttributes<Model>;
  sortBy: "ASC" | "DESC";
};

type ModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): Model;
};

abstract class RootRepository {
  public model: ModelStatic;
  constructor(model: ModelStatic) {
    this.model = model;
  }

  async getAllAndCount(
    conditions: Conditions | any,
    options: FindOptions = {}
  ): Promise<{ rows: Model[]; count: number }> {
    const {
      show = 10,
      page = 0,
      orderBy = "createdAt",
      sortBy = "ASC",
    } = conditions;

    const data = await this.model.findAndCountAll({
      limit: show,
      offset: show * page,
      order: [[orderBy, sortBy]],
      ...options,
    });

    return data;
  }

  async storeData(data: InferCreationAttributes<Model>) {
    const response = await this.model.create(data);
    return response;
  }

  async getBy(condition: WhereOptions = {}, options: FindOptions = {}) {
    const response = await this.model.findOne({ where: condition, ...options });
    return response;
  }

  async updateBy(
    condition: WhereOptions = {},
    data: InferCreationAttributes<Model>
  ) {
    const response = await this.model.update(data, { where: condition });
    return response;
  }

  async deleteBy(condition: WhereOptions = {}) {
    const response = await this.model.destroy({ where: condition });
    return response;
  }
}

export default RootRepository;
