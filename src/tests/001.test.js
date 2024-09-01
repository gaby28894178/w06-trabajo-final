require('../models')
const request = require('supertest')
const app = require('../app')
const Product = require('../models/Product')
const { DESCRIBE } = require('sequelize/lib/query-types')

const URL_BASE_LOGIN='/api/v1/userS/login'
const URL_BASE='/api/v1/cart'

let TOKEN;
let   idCart,idUser,idProduct;
let   product,ProductMokeado;
let   cartMokeado,cart;


beforeAll(async ()=>{

//User Creado
const user = {
    email: "juan@gmail.com",
    password: "juan1234"
  }
//Hacer Login Co  user Moke
const res = await request (app)
  .post(URL_BASE_LOGIN)
  .send (user)

  TOKEN =  res.body.token;
  idUser = res.body.user.id;
  ProductMokeado = {
    title:"mi producto",
    description:"producto-1",
    price:122
  }
  product = await Product.create(ProductMokeado)
  

  cartMokeado = {
    quantity:1,
    productId:product.id
  }


})
async function connect(url, metodo = 'post', data = null, id = null) {
  let res;

  if (metodo === 'post') {
    res = await request(app)
      .post(url)
      .send(data)  // Enviar los datos proporcionados
      .set("Authorization", `Bearer ${TOKEN}`);
  } else if (metodo === 'get') {
    res = await request(app)
      .get(url)
      .set("Authorization", `Bearer ${TOKEN}`);
  } else if (metodo === 'put') {
    res = await request(app)
      .put(`${url}/${id}`)  // URL con ID si es necesario
      .send(data)  // Enviar los datos proporcionados
      .set("Authorization", `Bearer ${TOKEN}`);
  } else if (metodo === 'delete') {
    res = await request(app)
      .delete(`${url}/${id}`)  // URL con ID si es necesario
      .set("Authorization", `Bearer ${TOKEN}`);
  }

  return res;  // Retornar la respuesta para usarla en el test
}

describe('Deberían pasar los 4 métodos POST GET UPDATE DELETE',  () => {
  
  // Definir el test POST 
  test('POST-> URL_BASE/ return statusCode 201, and res.body.quantity === cartMokeado.quantity', async () => {
    // Llamar a la función connect y esperar la respuesta
    const res = await connect(URL_BASE, 'post', cartMokeado);
    // Guardar el id del carrito obtenido en la respuesta
    idCart = res.body.id;
    // Imprimir el id y el cuerpo de la respuesta
    console.log(idCart);
    console.log(res.body);
    // Aserciones para verificar el resultado
    expect(res.statusCode).toBe(201);
    expect(res.body).toBeDefined();
    expect(res.body.userId).toBe(idUser);
    expect(res.body.id).toBe(idCart);
    expect(res.body.quantity).toBe(cartMokeado.quantity);
    expect(res.body.productId).toBe(cartMokeado.productId);
  });

  // Definir el test GET
  test('GET-> URL_BASE/ return 200, and res.body matches mock cart', async () => {
    const res = await connect(URL_BASE, 'get');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body).toHaveLength(1);

    expect(res.body[0].userId).toBeDefined();
    expect(res.body[0].userId).toBe(idUser);

    expect(res.body[0].productId).toBeDefined();
    expect(res.body[0].productId).toBe(product.id);
  });

  // Definir el test PUT
  test('PUT-> URL_BASE/:id, update product cart, res.body.quantity === mokeoCart.quantity, status code 200', async () => {
    const mokeoCart = {
      quantity: 21
    };
    const res = await connect(URL_BASE, 'put', mokeoCart, idCart);
    expect(res.statusCode).toBe(200);
    expect(res.body.quantity).toBe(mokeoCart.quantity);
  });

  // Definir el test DELETE
  test('DELETE-> URL_BASE/:id, delete product cart, res.statusCode === 204, expect length === 0', async () => {
    // Pasar la URL, el método, los datos y el id
    const res = await connect(URL_BASE, 'delete', null, idCart);

    expect(res.statusCode).toBe(204);

    // Verificar que el producto ha sido eliminado (opcional según el contexto)
    await product.destroy()
    const checkRes = await connect(URL_BASE, 'get');
    expect(checkRes.body).toHaveLength(0);
  });

});
