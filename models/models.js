const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING
    },
    username: {
        type: DataTypes.STRING,
        unique: true
    },
    firstName: {
        type: DataTypes.STRING,
    },
    lastName: {
        type: DataTypes.STRING,
    },
    userImage: {
        type: DataTypes.STRING,
    },
    company: {
        type: DataTypes.STRING,
    }
})
const Background = sequelize.define('background', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    urlImage: {
        type: DataTypes.STRING,
    },
    by_userId: {
        type: DataTypes.INTEGER,
    },
})

User.hasOne(Background)
Background.belongsTo(User)

module.exports = { User, Background }