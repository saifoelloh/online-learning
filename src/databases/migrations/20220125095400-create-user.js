"use strict";
const _ = require("lodash");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: true,
        type: Sequelize.STRING,
        unique: true,
      },
      birthdate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      role: {
        type: Sequelize.ENUM(["ADMIN", "CUSTOMER"]),
        defaultValue: "CUSTOMER",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: Sequelize.DATE,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
