const request = require('supertest'); 
const app = require('../app');
// const Category = require("../models/Category");

const BASE_URL = '/api/v1/cart';
const BASE_URL_LOGIN = '/api/v1/users/login';
let TOKEN;
let cartId;

// Hook para obtener el token de autenticación antes de las pruebas
beforeAll(async () => {
    const user = {
        email: "admin@gmail.com",
        password: "admin1234"
    };
    
    const res = await request(app)
        .post(BASE_URL_LOGIN)
        .send(user);
    
    // Obtengo el token del user 
    TOKEN = res.body.token;
});

// Datos de prueba para la categoría
const cart = {
    name: "Jeans"
};







test('GET /api/cart should return 200', async () => {
    // Prueba aquí
  });
  