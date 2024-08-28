const Category = require('../models/Category');
const catchError = require('../utils/catchError');

// Obtener todas las categorías
const getAll = catchError(async (req, res) => {
    const categories = await Category.findAll();
    return res.json(categories);
});

// Crear una categoría
const create = catchError(async (req, res) => {
    const { name } = req.body;
    const category = await Category.create({ name });
    return res.status(201).json(category);
});

// Eliminar una categoría
const destroy = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await Category.destroy({ where: { id } });
    return result === 0 
        ? res.status(404).json({ msg: 'Categoría no encontrada' }) 
        : res.status(204).send(); // 204 No Content, no se necesita enviar un cuerpo en la respuesta
});

module.exports = {
    getAll,
    create,
    destroy,
};
