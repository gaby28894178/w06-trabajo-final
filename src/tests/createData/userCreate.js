const User = require("../../models/User")

const userCreate = async()=>{

const user = {firstName:"juan",lastName:"perez", email:"admin@gmail.com", password:"admin1234",
    phone:"+541121214585"
}
    await User.create(user)
}

module.exports = userCreate