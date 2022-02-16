import _ from "lodash";
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { USER_ROLE } from "../../../types/user";

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare email: string;
  declare password: string;
  declare birthdate: Date;
  declare role: CreationOptional<USER_ROLE>;

  static associate(models: any) {
    User.hasMany(models.Course, {
      foreignKey: "coordinatorId",
      as: "courses",
    });
  }
}

module.exports = (sequelize: any, DataTypes: any) => {
  User.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: true,
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.ENUM,
        values: _.values(USER_ROLE),
        defaultValue: USER_ROLE.CUSTOMER,
      },
      birthdate: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      paranoid: true,
      modelName: "User",
    }
  );

  return User;
};
