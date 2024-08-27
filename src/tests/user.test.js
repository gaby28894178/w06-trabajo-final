//  const User = require("../models/User");
// const userRouter = require('./userRouter');
const request = require('supertest')
const app = require('../app')
const bcrypt =require('bcrypt')



const BASE_URL = "/api/v1/users";
let TOKEN;
let TOKEN2;
let userId;
beforeAll(async()=>{
  const user = {
    email: "admin@gmail.com",
    password: "admin1234"
  }


  const res = await request(app)
    .post(`${BASE_URL}/login`)
    .send(user)
    TOKEN = res.body.token
    // console.log(`LA LLAVE TOKEN ES:" ${TOKEN} "`)

})

const user = {
  firstName: "juan2",
  lastName: "peraz",
  email: "admin1234@gmail.com",
  password: "admin1234",
  phone: "541121664785"
};
const comprobacion = ['firstName', 'lastName','email','phone']


// POST 
  test(" POST->BASE_URL, return status code  201 y res.body firsName ===user.firtName  ", async () => {
    const res = await request(app)
          .post(BASE_URL)
          .send(user)

          userId = res.body.id
          // console.log(res.body);  // Agrega esta línea para inspeccionar la respuesta
          expect(res.statusCode).toBe(201)
          expect(res.body).toBeDefined()
          comprobacion.forEach((e)=>{
            expect(res.body[e]).toBeDefined()

          })
        comprobacion.forEach((e)=>{
          //evado el correo ya q el mismo varia los numeros 
            expect(res.body[e]).toBe(user[e])
          // expect(res.body[e]).toBe(user[e])


        })
});
//GET
test('GET -> BASE_URL, retorna status Code 200, y res.body.length',async()=>{
  const res = await request(app)
          .get(BASE_URL)
          .set('authorization', `Bearer ${TOKEN}`); 
        expect(res.statusCode).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body).toHaveLength(2)

})


//LOGIN
test('POST -> "BASE_URL/LOGIN" return statusCode 200 and res.body.meil === hits.emeil ',async()=>{
  const hits = {
    email: "admin1234@gmail.com",
    password: "admin1234"
   }
    const res = await request(app)

    .post(`${BASE_URL}/login`)
    .send(hits)
    const isValid = await bcrypt.compare(hits.password,res.body.user.password)
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.user).toBeDefined()
    expect(res.body.token).toBeDefined()
    expect(res.body.user.email).toBe(hits.email)
    expect(isValid).toBe(true)

})

//LOGIN error 
test('POST -> "BASE_URL/LOGIN" Error return statusCode 401 and res.body.meil === hits.emeil ',async()=>{
  const hits = {
    email: "admin1234@gmail.com",
    password: "invalidUser"
   }
    const res = await request(app)
    .post(`${BASE_URL}/login`)
    .send(hits)
     expect(res.statusCode).toBe(401)
    

})






//PUT
test('PUT-> BASE_URL , return status code 200',async()=>{
  const userEdit = {
    firstName: "Gabriel",
    lastName:   "maziel",
  }
  const res = await request(app)
  .put(`${BASE_URL}/${userId}`)
  .set('authorization', `Bearer ${TOKEN}`)  // Agrega el token aquí
  .send(userEdit)
      // console.log(res.statusCode)
      expect(res.status).toBe(200);
      expect(res.body).toBeDefined()
  
})





//DELETE
test('DELETE-> BASE_URL/:id , return status code 200',async()=>{
  const res = await request(app)
  .delete(`${BASE_URL}/${userId}`)
  .set('authorization', `Bearer ${TOKEN}`)  // Agrega el token aquí
      // console.log(res.statusCode)
      expect(res.status).toBe(200);
      expect(res.body).toBeDefined()
  
})

