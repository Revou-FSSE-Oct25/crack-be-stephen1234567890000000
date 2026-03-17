"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.User, { foreignKey: "UserId" });
      Booking.belongsTo(models.Schedule, { foreignKey: "ScheduleId" });
    }
  }
  Booking.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ScheduleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM,
        values: ["pending", "confirmed", "cancelled"],
        allowNull: false,
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Booking",
    },
  );
  return Booking;
};
