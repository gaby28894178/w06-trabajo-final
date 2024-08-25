const { getAll,  create, update, destroy, login } = require('../controllers/user.controllers');
const { verifyJwt } = require('../utils/verifyJWT');

const express = require('express');

const userRouter = express.Router();

userRouter.route('/')
    .get(verifyJwt,getAll)
    .post(create);

userRouter.route('/login')
    .post(login)

userRouter.route('/:id')
    // .get(getOne)
    .delete(verifyJwt, destroy)
    .put(verifyJwt, update);

module.exports = userRouter;


