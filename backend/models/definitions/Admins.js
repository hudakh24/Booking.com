const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../bin/dbConfig");
const { hash } = require("bcryptjs");
const { v4: uuid } = require("uuid");

class admins extends Model {}

admins.init(
  {
    adminId: {
      type: DataTypes.STRING(60),
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING(34),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(34),
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING(34),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
    mobile: {
      type: DataTypes.STRING(),
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM, //ENUM is a datatype that is strictly defined
      values: ["Super Admin", "Hotel Admin", "Flight Admin"],
      allowNull: false,
    },
  },
  {
    timestamps: true, //sets create time and update time
    paranoid: true, // gives delete time
    modelName: "Admins", //table name
    sequelize, //db connection
  }
);

admins.beforeCreate(async (admin) => {
  admin.adminId = uuid();
  admin.password = await hash(admin.password, 10);
});

admins.afterCreate(async (admin) => {
  delete admin.dataValues.password;
});

module.exports = admins;
