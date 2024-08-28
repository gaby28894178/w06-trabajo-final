require('../models');
const request = require('supertest');
const app = require('../app');
const Category = require('../models/Category');

const BASE_URL = '/api/v1/products';
const BASE_URL_LOGIN = '/api/v1/users/login';
let TOKEN;
let category;
let productId;
let product;

// Hook para obtener el token de autenticación antes de las pruebas
const user = {
    email: "admin@gmail.com",
    password: "admin1234"
};
beforeAll(async () => {
    const res = await request(app)
        .post(BASE_URL_LOGIN)
        .send(user);    
    // Obtengo el token del usuario 
    TOKEN = res.body.token;
    // Datos de prueba para la categoría y el producto
    category = await Category.create({ name: "rapo dama" });
    
    product = {
        title: "pantalon",
        description: "pantalon azul",
        price: 12.31,
        categoryId: category.id
    };
});

afterAll(async () => {
    await category.destroy();
});

// Prueba de creación de producto (POST)
test("POST -> BASE_URL, debe retornar status code 201 y res.body.title === product.title", async () => {
    const res = await request(app)
        .post(BASE_URL)
        .send(product)
        .set('authorization', `Bearer ${TOKEN}`); 

    productId = res.body.id;
    expect(res.statusCode).toBe(201);
    expect(res.body).toBeDefined();
    expect(res.body.title).toBe(product.title);
});

// Prueba para obtener todos los productos (GET)
test('GET -> BASE_URL, debe retornar status code 200 y un array de productos', async () => {
    const res = await request(app)
        .get(BASE_URL)
        .set('authorization', `Bearer ${TOKEN}`); 
   
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.length).toBeGreaterThanOrEqual(1); // Verifica que haya al menos un producto
});

// Prueba para editar un producto (PUT)
test('PUT -> BASE_URL/:id, debe retornar status code 200 y actualizar el producto', async () => {
    const productEdit = {
        title: "Gabriel Updated",
        description: "maziel updated",
        price: 1500
    };

    const res = await request(app)
        .put(`${BASE_URL}/${productId}`)
        .set('authorization', `Bearer ${TOKEN}`)  
        .send(productEdit);

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBeDefined();
    expect(res.body.title).toBe(productEdit.title);  // Verifica que el título se haya actualizado
});
