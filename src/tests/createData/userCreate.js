const User = require("../../models/User")

const userCreate = async()=>{

let  user = {
                firstName:"juan",
                lastName:"perez", 
                email:"admin@gmail.com", 
                password:"admin1234",
                phone:"154112121"
}
    await User.create(user)
    
    
    
    let user1 = {
        firstName:"juan",
        lastName:"perez", 
        email: "juan@gmail.com",
        password: "juan1234",
        phone:"154112121"
    }
   await User.create(user1)
    
}
module.exports = userCreate