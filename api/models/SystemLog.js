const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const SystemLog = sequelize.define("SystemLog", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  level: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  stack: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  route: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  method: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  tableName: "system_logs",
  timestamps: true,
});

module.exports = SystemLog;
