const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');


// En Mayúsculas y singular
// sequelizer le colocara catregories
const Category   = sequelize.define('category', {
    // Definimos las columnas aquí
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Category   ;