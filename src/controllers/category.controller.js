const Category = require('../models/Category');
const catchError = require('../utils/catchError');

// Get All Categories
const getAll = catchError(async (req, res) => {
    const categories = await Category.findAll();
    return res.json(categories);
});

// Create Category
const create = catchError(async (req, res) => {
    const { name } = req.body;
    const category = await Category.create({ name });
    return res.status(201).json(category);
});

// Delete Category
const destroy = catchError(async (req, res) => {
    const { id } = req.params;
    const deleted = await Category.destroy({ where: { id } });
    return deleted ? res.json({ message: 'Category deleted' }) : res.status(404).json({ message: 'Category not found' });
});

module.exports = {
    getAll,
    create,
    destroy,
};
