const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');
const bcrypt = require('bcrypt')

// En Mayúsculas y singular
const User = sequelize.define('user', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: { 
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
    
  },
});

//hooks de sequelizer  antes encripto la contraseña
User.beforeCreate(async(user)=>{
  const password = user.password
  const hashPassword = await bcrypt.hash(password,10)
  user.password = hashPassword
  
})



module.exports = User