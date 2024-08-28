const request = require('supertest'); 
const app = require('../app');
// const Category = require("../models/Category");

const BASE_URL = '/api/v1/categories';
const BASE_URL_LOGIN = '/api/v1/users/login';
let TOKEN;
let categoryId;

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
const category = {
    name: "Jeans"
};

// Prueba de creación de categoría
test('POST -> BASE_URL, debe retornar statusCode 201, y res.body.name === category.name', async () => {
    const res = await request(app)
        .post(BASE_URL)
        .send(category)
        .set('authorization', `Bearer ${TOKEN}`); 

    categoryId = res.body.id;
    expect(res.statusCode).toBe(201);
    expect(res.body).toBeDefined();
    expect(res.body.name).toBe(category.name);  
});

// Prueba para obtener todas las categorías
test('GET -> BASE_URL, debe retornar statusCode 200 y un array de categorías', async () => {
    const res = await request(app)
        .get(BASE_URL)
        .set('authorization', `Bearer ${TOKEN}`); 

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);  // Verificar que al menos haya una categoría
});
//DELETE
test('DELETE-> BASE_URL/:id , return status code 200',async()=>{
    const res = await request(app)
    .delete(`${BASE_URL}/${categoryId}`)
    .set('authorization', `Bearer ${TOKEN}`)  // Agrega el token aquí
        // console.log(res.statusCode)
        expect(res.status).toBe(204);
        expect(res.body).toBeDefined()
    
  })
  
  