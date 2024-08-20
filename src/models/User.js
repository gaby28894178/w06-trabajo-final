
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

  User.beforeCreate(async(user)=>{
    const password = user.password
    const hasPassword = await bcrypt.hash(password,10)
    user.password = hasPassword
    
  })
  module.exports = User