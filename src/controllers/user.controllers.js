const User = require('../models/User');
const catchError = require('../utils/catchError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// const { where } = require('sequelize');

// Get All
const getAll = catchError(async (req, res) => {
    const result = await User.findAll();
    return res.json(result);
});



// POST
const create = catchError(async (req, res) => {
    const {email}= req.body;
    //comprobar si es formato valido con regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(email)?  res.status(400).json({error:"coloque correo valido"})
    :res.status(201).json( await User.create(req.body));

});

// UPDATE
const update = catchError(async (req, res) => {
    const { id } = req.params;
    const restrict = ["password","email","phone"];
    restrict.forEach((e)=>{
        delete req.body[e]
    })
    const result = await User.update(req.body, { where: { id }, returning: true });
    return result[0] === 0 ? res.sendStatus(404) : res.json(result[1][0]);
});

// DELETE
const destroy = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await User.destroy({ where: { id } });
    return !result ? res.status(404).json({ msj: 'Nada Para mostrar' }) : res.status(200).json({ msg: 'Dato Eliminado con Exito' });
});

const login = catchError(async(req, res)=>{
    const {email, password}= req.body
    const user = await User.findOne({where:{ email }})
    if (!user) return res.status(401).json({msg:"User Not Found "})

     const isValid = await bcrypt.compare(password,user.password)
    if(!isValid)return res.sendStatus(401)
    const token = jwt.sign(
        {user},
        process.env.TOKEN_SECRET,
        {expiresIn:'1d'}
    )
    return res.status(200).json({user,token})
})

const me = catchError(async(req, res)=>{
    
})


module.exports = {
    getAll,
    create,
    update,
    destroy,
    login
};