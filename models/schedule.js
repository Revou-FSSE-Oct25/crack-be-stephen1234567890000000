"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Schedule.belongsTo(models.Service, { foreignKey: "ServiceId" });
      Schedule.belongsTo(models.User, { foreignKey: "TrainerId" });
      Schedule.hasMany(models.Booking, { foreignKey: "ScheduleId" });
    }
  }
  Schedule.init(
    {
      ServiceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      TrainerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      startTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      endTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Schedule",
    },
  );
  return Schedule;
};
