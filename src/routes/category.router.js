const { getAll, create, destroy } = require('../controllers/category.controller');
const { verifyJwt } = require('../utils/verifyJWT');
const express = require('express');

const categoryRouter = express.Router();

categoryRouter.route('/')
    .get(getAll)
    .post(verifyJwt, create);

categoryRouter.route('/:id')
    // .get(getOne)
    .delete(verifyJwt, destroy)
    // .put(update);

module.exports = categoryRouter;
