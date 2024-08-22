const catchError = require('../utils/catchError');
const User = require('../models/User');
const bcrypt = require('bcrypt')
// const { where } = require('sequelize');

// Get All
const getAll = catchError(async (req, res) => {
    const result = await User.findAll();
    return res.json(result);
});

// Get One
const getOne = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await User.findByPk(id);
    return !result ? res.status(404).json({ msj: 'Nada q Mostrar' }) : res.json(result);
});

// POST
const create = catchError(async (req, res) => {
    const result = await User.create(req.body);
    return res.status(201).json(result);
});

// UPDATE
const update = catchError(async (req, res) => {
    const { id } = req.params;
    const restrict = ["password","email"];

    const result = await User.update(req.body, { where: { id }, returning: true });
    return result[0] === 0 ? res.sendStatus(404) : res.json(result[1][0]);
});

// DELETE
const destroy = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await User.destroy({ where: { id } });
    return !result ? res.status(404).json({ msj: 'Nada Para mostrar' }) : res.status(204).json({ msg: 'Dato Eliminado con Exito' });
});

const login = catchError(async(req, res)=>{
    const {email, password}= req.body
    const user = await User.findOne({where:{email}})
    if (!user) return res.status(401).json({msg:"User Not Found "})
     const isValid = await bcrypt.compare(password,user.password)
    if(!isValid)return res.sendStatus(401)
        return res.json(user)
})


module.exports = {
    getAll,
    getOne,
    create,
    update,
    destroy,
    login
};