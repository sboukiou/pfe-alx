const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize with SQLite
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'tasks.db',
});

// Define Task model
const Task = sequelize.define('Task', {
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    statu: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    timestamps: true,
});

module.exports = { sequelize, Task };
