// models/LinkedinUser.js
const { Sequelize, DataTypes } = require('sequelize');

module.exports = function (sequelize) {
  return sequelize.define('LinkedinUser', {
    accountName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    follower_connectionCount: {
      type: DataTypes.STRING,
      allowNull: false
    },
    about: {
      type: DataTypes.STRING,
      allowNull: true
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
};
