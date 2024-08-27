const catchError = require('../utils/catchError');
const Category = require('../models/Category');

// Get All
const getAll = catchError(async (req, res) => {
    const result = await Category.findAll();
    return res.json(result);
});
// POST
const create = catchError(async (req, res) => {
    const result = await Category.create(req.body);
    return res.status(201).json(result);
});

// DELETE
const destroy = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await Category.destroy({ where: { id } });
    return !result ? res.status(404).json({ msj: 'Nada Para mostrar' }) : res.status(204).json({ msg: 'Dato Eliminado con Exito' });
});

module.exports = {
    getAll,  
    create,
    destroy
};