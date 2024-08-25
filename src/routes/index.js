const express = require('express');
const userRouter = require('./user.router');
const router = express.Router();

// colocar las rutas aquí
router.use('/users',userRouter)
router.use('/users/login',userRouter)

module.exports = router;