require('../models')
const app = require('../app');  
const request = require('supertest');
const User =  require('../models/User')
const Product =  require('../models/Product')
const Cart=  require('../models/Cart')
const Category = require('../models/Category');

const BASE_URL_CART = '/api/v1/cart';
const BASE_URL_LOGIN = '/api/v1/users/login';
let TOKEN;
let userId;
let category;
let product;

let cartItems;
let cartItemsId;
//quantity = cantidad 

//hacer  esto antes de todo 
beforeAll(async () => {   
    // usuario categoria y productos 
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

});
//despues de todo hacer esto 
afterAll(async()=>{
    await category.destroy()
    await product.destroy()
})

test('Post->',async () => {
    cartItems = {productId:product.id,quantity:15}
    const res = await request(app)
    .post(BASE_URL_CART)
    .send(cartItems)
    .set('Authorization', `Bearer ${TOKEN}`)
    expect(res.status).toBe(201) 
    expect(res.body).toBeDefined()
    expect(res.body.productId).toBe(product.id)
    expect(res.body.userId).toBe(userId)
    expect(res.body.quantity).toBe(cartItems.quantity)
  })


