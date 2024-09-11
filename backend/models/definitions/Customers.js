const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../bin/dbConfig");
const { hash } = require("bcryptjs");
const { v4: uuid } = require("uuid");

class customers extends Model {}

customers.init(
  {
    customerId: {
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
      type: DataTypes.STRING(13),
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(),
      unique: true,
      allowNull: false,
    },
  },
  {
    timestamps: true, //sets create time and update time
    paranoid: true, // gives delete time
    modelName: "Customers", //table name
    sequelize, //db connection
  }
);

customers.beforeCreate(async (customer) => {
  customer.customerId = uuid();
  customer.password = await hash(customer.password, 10);
});

customers.afterCreate(async (customer) => {
  delete customer.dataValues.password;
});

module.exports = customers;
