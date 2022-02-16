import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import User from "./user";

export class Course extends Model<
  InferAttributes<Course>,
  InferCreationAttributes<Course>
> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare description: string;
  declare price: number;
  declare coordinatorId: string;

  static associate(models: any) {
    Course.belongsTo(models.User, {
      foreignKey: "coordinatorId",
      as: "coordinator",
    });
  }
}

module.exports = (sequelize: any, DataTypes: any) => {
  Course.init(
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
      description: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      price: {
        type: DataTypes.DOUBLE,
        validate: { min: 0 },
      },
      coordinatorId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        references: {
          model: User,
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Course",
      paranoid: true,
    }
  );

  return Course;
};
