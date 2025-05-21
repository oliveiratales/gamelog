const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./User");

const UserGame = sequelize.define(
  "UserGame",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    gameId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    finishedAt: {
      type: DataTypes.DATE,
      allowNull: null,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        min: 0,
        max: 5,
      },
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "user_games",
    timestamps: true,
  }
);

module.exports = UserGame;
