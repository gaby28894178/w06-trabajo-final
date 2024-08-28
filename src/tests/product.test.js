
const request = require('supertest');
const app = require('../app');
// const app = require('../app')
const bcrypt =require('bcrypt')

const BASE_URL = '/api/v1/products';
const BASE_URL_LOGIN = '/api/v1/users/login';
let TOKEN;
let productId;

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

// Datos de prueba para el producto
const product = {
    title: "Gabriel",
    description: "maziel",
    price: 1231
};

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
  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(2)

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

// // Prueba para eliminar un producto (DELETE)
// test('DELETE -> BASE_URL/:id, debe retornar status code 200 y eliminar el producto', async () => {
//     const res = await request(app)
//         .delete(`${BASE_URL}/${productId}`)
//         .set('authorization', `Bearer ${TOKEN}`);  

//     expect(res.statusCode).toBe(200);
//     expect(res.body).toBeDefined();
// });
