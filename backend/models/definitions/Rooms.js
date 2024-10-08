const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../bin/dbConfig");
const hotels = require("./Hotels");
const { v4: uuid } = require("uuid");

class rooms extends Model {}

rooms.init(
  {
    roomId: {
      type: DataTypes.STRING(60),
      primaryKey: true,
    },
    roomNo: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    hotelId: {
      allowNull: false,
      type: DataTypes.STRING(),
      references: {
        model: hotels,
        key: "hotelId",
      },
    },
    roomType: {
      type: DataTypes.ENUM, //ENUM is a datatype that is strictly defined
      values: ["single", "double", "suite"],
      allowNull: false,
    },
    pricePerNight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true, //sets create time and update time
    modelName: "Rooms", //table name
    sequelize, //db connection
  }
);
rooms.beforeCreate(async (room) => {
  room.roomId = uuid();
});

module.exports = rooms;
