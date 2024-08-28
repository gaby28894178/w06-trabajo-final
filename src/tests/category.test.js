const { request } = require("express")
//hooks
const BASE_URL ='/api/v1/categories'
const BASE_URL_LOGIN ='/api/v1/users/login'

beforeAll (async()=>{
    const BASE_URL =  '/api/v1/users';
    const user = {
        email:"admin@gmail.com", 
        password:"admin1234"
    }
    const res = await request(app)
    .post(BASE_URL_LOGIN)
    .send(user)
    TOKEN = res.body.token;
    
})
test('POST -> BASE_URL, deve retornar  statusCode 201, rest.body.name===category.name', async() => {
    const res = await request(app)
    .post(`${BASE_URL}/login`)




  
})
