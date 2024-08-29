require('../models')
const app = require('../app');  
const request = require('supertest');

const Product =  require('../models/Product')
const Cart=  require('../models/Cart')
const Category = require('../models/Category');

const URL_BASE = '/api/v1/purchase'
const BASE_URL_LOGIN = '/api/v1/users/login'
let TOKEN;
let userId,category,product;
let cart;


beforeAll( async()=>{
    //usuario   //  categoria // producto // Carrito
    const hits = {
        email:"admin@gmail.com", 
      password:"admin1234"
   };
  const res = await request(app)
      .post(BASE_URL_LOGIN)
      .send(hits)
      TOKEN=res.body.token;
      userId = res.body.user.id;
  category = await Category.create({name:"remera"})

  product = await Product.create({title:"mi producto",
                                  description:"miproducto",
                                  price:122.21,
                                  categoryId:category.id
  });


  cart = await Cart.create({
                            quantity:12,
                            userId,
                            productId:product.id                        
                        })
                        
                        
                    });
                    afterAll(async()=>{
                        await category.destroy()
                        await product.destroy()
                        
                    })
            
test('POST -> ',async()=>{
    const res = await request(app)
    .post(URL_BASE)
    .set('authorization', `Bearer ${TOKEN}`); 
    console.log(res.body)
    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body[0].userId).toBe(userId)
    expect(res.body[0].productId).toBe(product.id)
    expect(res.body[0].quantity).toBe(cart.quantity)
    expect(res.body).toHaveLength(1)


})
//get sin arreglos 
