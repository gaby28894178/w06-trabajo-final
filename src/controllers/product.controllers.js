const catchError = require('../utils/catchError');
const Product = require('../models/Product');
const Category = require('../models/Category');





const getAll = catchError(async (req, res) => {
    const results = await Product.findAll({ include: [Category] });
    return res.json(results);
});

// const getAll = catchError(async (req, res) => {
//     const result = await User.findAll();
//     return res.json(result);
// });




const create = catchError(async (req, res) => {
    const result = await Product.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await Product.findByPk(id, { include: [Category] });
    if (!result) return res.sendStatus(404);
    return res.status(200).json(result); // Cambiado de res.statusCode(200) a res.status(200)
});

const remove = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await Product.destroy({ where: { id } });
    if (!result) return res.sendStatus(404);
    return res.status(204).send(); // Elimina el cuerpo de la respuesta para status 204
});

const update = catchError(async (req, res) => {
    const { id } = req.params;
    const [updatedRowsCount, updatedRows] = await Product.update(
        req.body,
        { where: { id }, returning: true }
    );
    if (updatedRowsCount === 0) return res.sendStatus(404);
    return res.json(updatedRows[0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
};
