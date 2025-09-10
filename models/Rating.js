 
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Store = require("./Store");

const Rating = sequelize.define("Rating", {
  value: { type: DataTypes.INTEGER, allowNull: false }
});

Rating.belongsTo(User);
Rating.belongsTo(Store);

module.exports = Rating;
