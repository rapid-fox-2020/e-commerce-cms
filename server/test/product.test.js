const request = require('supertest');
const app = require("../app.js")
const { sequelize } = require("../models")
const { queryInterface } = sequelize

describe('Test products',()=>{
  let getAccessToken = ""
  let itemId = ""
  const testerProduct = {
     name: 'Baju 1',
     image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2018/8/9/6143497/6143497_b4519a1b-9e8a-45d2-8359-73c787f39bf9_640_640.jpg',
     price: 100000,
     stock: 10,
     category: "Kemeja",
     createdAt: new Date(),
     updatedAt: new Date()
   }
  beforeAll((done) => {
    return queryInterface.bulkInsert('Products', [testerProduct], {})
    .then(()=>{
      const dataUser = { email:"abcde@gmail.com",password: "abcde"}
      return request(app)
        .post('/login')
        .send(dataUser)
        .set('Accept', 'application/json')
      })
      .then((response)=>{
        getAccessToken = response.body.accessToken
        done()
      })
      .catch((err)=>{
        done(err)
      })
  })
  afterAll((done) => {
    return queryInterface.bulkDelete("Products",null,{})
    .then(()=>{
      done()
    })
    .catch((err)=>{
      done(err)
    })
  })

  //Routing for show Products
  describe('Test Route GET/ products', () => {
    test('response(200) success get Data - return products data', (done) => {
      const accessToken = getAccessToken
      request(app)
      .get('/products')
      .set({token:accessToken,Accept:'application/json'})
      .then((response)=>{
        const { body, status } = response
        expect(status).toBe(200)
        expect(body[0].id).toEqual(expect.any(Number))
        expect(body[0].name).toBe(testerProduct.name)
        expect(body[0].image_url).toBe(testerProduct.image_url)
        expect(+body[0].price).toBe(testerProduct.price)
        expect(+body[0].stock).toBe(testerProduct.stock)
        expect(body[0].category).toBe(testerProduct.category)
        done()
      })
      .catch((err)=>{
        done(err)
      })
    })

    test('response(400) failed get Data - return token not found', (done) => {
      const accessToken = ""
      request(app)
      .get('/products')
      .set('Accept', 'application/json')
      .then((response)=>{
        const { body, status } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty("message","Token Not Found")
        done()
      })
      .catch((err)=>{
        done(err)
      })
    })
    test('response(400) failed get Data - return invalid token', (done) => {
      const accessToken = "abcdefghijklmnopqr"
      request(app)
      .get('/products')
      .set({token:accessToken,Accept:'application/json'})
      .then((response)=>{
        const { body, status } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty("message","Invalid Token")
        done()
      })
      .catch((err)=>{
        done(err)
      })
    })
    test('response(403) failed get Data - return forbidden access', (done) => {
      const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJoYWloYWlAZ21haWwuY29tIn0.I0BJsQPNiUvUtmQ0zC5Qw0aeyYDL8sXusX6pGFdMNlA"
      request(app)
      .get('/products')
      .set({token:accessToken,Accept:'application/json'})
      .then((response)=>{
        const { body, status } = response
        expect(status).toBe(403)
        expect(body).toHaveProperty("message","You dont have permission to access this page/features")
        done()
      })
      .catch((err)=>{
        done(err)
      })
    })
  })


  //Routing for add Product
  describe('Test Route POST/ products', () => {
    let notAdminAccessToken
    beforeAll((done)=>{
      const dataUser = { email:"pqrst@gmail.com",password: "pqrst"}
      return request(app)
        .post('/login')
        .send(dataUser)
        .set('Accept', 'application/json')
      .then((response)=>{
        notAdminAccessToken = response.body.accessToken
        done()
      })
      .catch((err)=>{
        done(err)
      })
    })
    test('response(201) success create Data - return created product data', (done) => {
      const accessToken = getAccessToken
      const addProduct = {name:"Baju lapis",image_url:"www.pinterest.com",price:100000,stock:20,category:"Kemeja"}
      request(app)
      .post('/products')
      .set({token:accessToken,Accept:'application/json'})
      .send(addProduct)
      .then((response)=>{
        const { body, status } = response
        itemId = response.body.id
        expect(status).toBe(201)
        expect(body.id).toEqual(expect.any(Number))
        expect(body.name).toBe(addProduct.name)
        expect(body.image_url).toBe(addProduct.image_url)
        expect(+body.price).toBe(addProduct.price)
        expect(+body.stock).toBe(addProduct.stock)
        expect(body.category).toBe(addProduct.category)
        done()
      })
      .catch((err)=>{
        done(err)
      })
    })
    test('response(400) failed Create Data - return validation for Name', (done) => {
      const accessToken = getAccessToken
      const addProduct = {name:"",image_url:"www.pinterest.com",price:100000,stock:20,category:"Kemeja"}
      request(app)
      .post('/products')
      .set({token:accessToken,Accept:'application/json'})
      .send(addProduct)
      .then((response)=>{
        const { body, status } = response
        expect(status).toBe(400)
        expect(body.message).toEqual(expect.arrayContaining(["Name is required"]))
        done()
      })
      .catch((err)=>{
        done(err)
      })
    })
    test('response(400) failed Create Data - return validation for Image_URL', (done) => {
      const accessToken = getAccessToken
      const addProduct = {name:"Baju baju",image_url:"",price:100000,stock:20,category:"Kemeja"}
      request(app)
      .post('/products')
      .set({token:accessToken,Accept:'application/json'})
      .send(addProduct)
      .then((response)=>{
        const { body, status } = response
        expect(status).toBe(400)
        expect(body.message).toEqual(expect.arrayContaining(["Wrong URL for Image"]))
        done()
      })
      .catch((err)=>{
        done(err)
      })
    })
    test('response(400) failed Create Data - return validation for price(in number format)', (done) => {
      const accessToken = getAccessToken
      const addProduct = {name:"Baju baju",image_url:"www.google.com",price:5000,stock:20,category:"Kemeja"}
      request(app)
      .post('/products')
      .set({token:accessToken,Accept:'application/json'})
      .send(addProduct)
      .then((response)=>{
        const { body, status } = response
        expect(status).toBe(400)
        expect(body.message).toEqual(expect.arrayContaining(["Price must be greater than 10000"]))
        done()
      })
      .catch((err)=>{
        done(err)
      })
    })
    test('response(400) failed Create Data - return validation for price(in string format)', (done) => {
      const accessToken = getAccessToken
      const addProduct = {name:"Baju baju",image_url:"www.google.com",price:"price",stock:20,category:"Kemeja"}
      request(app)
      .post('/products')
      .set({token:accessToken,Accept:'application/json'})
      .send(addProduct)
      .then((response)=>{
        const { body, status } = response
        expect(status).toBe(400)
        expect(body.message).toEqual(expect.arrayContaining(["Price must be in number format"]))
        done()
      })
      .catch((err)=>{
        done(err)
      })
    })
    test('response(400) failed Create Data - return validation for stock (in number format)', (done) => {
      const accessToken = getAccessToken
      const addProduct = {name:"Baju baju",image_url:"www.google.com",price:100000,stock:0,category:"Kemeja"}
      request(app)
      .post('/products')
      .set({token:accessToken,Accept:'application/json'})
      .send(addProduct)
      .then((response)=>{
        const { body, status } = response
        expect(status).toBe(400)
        expect(body.message).toEqual(expect.arrayContaining(["Stock must be greater than 0"]))
        done()
      })
      .catch((err)=>{
        done(err)
      })
    })
    test('response(400) failed Create Data - return validation for stock(in string format)', (done) => {
      const accessToken = getAccessToken
      const addProduct = {name:"Baju baju",image_url:"www.google.com",price:100000,stock:"stock",category:"Kemeja"}
      request(app)
      .post('/products')
      .set({token:accessToken,Accept:'application/json'})
      .send(addProduct)
      .then((response)=>{
        const { body, status } = response
        expect(status).toBe(400)
        expect(body.message).toEqual(expect.arrayContaining(["Stock must be in number format"]))
        done()
      })
      .catch((err)=>{
        done(err)
      })
    })
    test('response(403) failed get Data - return forbidden access', (done) => {
      const accessToken = notAdminAccessToken
      const addProduct = {name:"Baju baju",image_url:"www.google.com",price:100000,stock:100,category:"Kemeja"}
      request(app)
      .post('/products')
      .set({token:accessToken,Accept:'application/json'})
      .send(addProduct)
      .then((response)=>{
        const { body, status } = response
        expect(status).toBe(403)
        expect(body).toHaveProperty("message","You dont have permission to access this page/features")
        done()
      })
      .catch((err)=>{
        done(err)
      })
    })
  })

  describe('Test Route GET/ products/:id', () => {
    test('response(200) success get Data - return product data', (done) => {
      const accessToken = getAccessToken
      request(app)
      .get(`/products/${itemId}`)
      .set({token:accessToken,Accept:'application/json'})
      .then((response)=>{
        const { body, status } = response
        expect(status).toBe(200)
        expect(body.id).toEqual(expect.any(Number))
        expect(body.name).toBe("Baju lapis")
        expect(body.image_url).toBe("www.pinterest.com")
        expect(+body.price).toBe(100000)
        expect(+body.stock).toBe(20)
        expect(body.category).toBe("Kemeja")
        done()
      })
      .catch((err)=>{
        done(err)
      })
    })
  })
  //Routing for update Product (validation for put === validation for post)
  describe('Test Route PUT/products/:id', () => {
    test('response(200) success update Data - return new updated product data', (done) => {
      const accessToken = getAccessToken
      const updateProduct = {name:"Baju saja",image_url:"www.blabla.com",price:100000,stock:10,category:"Kemeja"}
      request(app)
      .put(`/products/${itemId}`)
      .set({token:accessToken,Accept:'application/json'})
      .send(updateProduct)
      .then((response)=>{
        const { body, status } = response
        expect(status).toBe(200)
        expect(body.id).toEqual(expect.any(Number))
        expect(body.name).toBe(updateProduct.name)
        expect(body.image_url).toBe(updateProduct.image_url)
        expect(+body.price).toBe(updateProduct.price)
        expect(+body.stock).toBe(updateProduct.stock)
        expect(body.category).toBe(updateProduct.category)
        done()
      })
      .catch((err)=>{
        done(err)
      })
    })
    test('response(404) failed update Data - return not found error', (done) => {
      const accessToken = getAccessToken
      const updateProduct = {name:"Baju saja",image_url:"www.blabla.com",price:100000,stock:10,category:"Kemeja"}
      request(app)
      .put(`/products/${+itemId+10}`)
      .set({token:accessToken,Accept:'application/json'})
      .send(updateProduct)
      .then((response)=>{
        const { body, status } = response
        expect(status).toBe(404)
        expect(body).toHaveProperty("message","Product not Found")
        done()
      })
      .catch((err)=>{
        done(err)
      })
    })
  })

  //Routing for deletedData
  describe('Test Route DELETE/products/:id', () => {
    test('response(200) success delete Data - return deleted product data', (done) => {
      const accessToken = getAccessToken
      request(app)
      .delete(`/products/${itemId}`)
      .set({token:accessToken,Accept:'application/json'})
      .then((response)=>{
        const { body, status } = response
        expect(status).toBe(200)
        expect(+body.id).toEqual(+itemId)
        done()
      })
      .catch((err)=>{
        done(err)
      })
    })
    test('response(404) failed delete Data - return not found error', (done) => {
      const accessToken = getAccessToken
      request(app)
      .delete(`/products/${+itemId+10}`)
      .set({token:accessToken,Accept:'application/json'})
      .then((response)=>{
        const { body, status } = response
        expect(status).toBe(404)
        expect(body).toHaveProperty("message","Product not Found")
        done()
      })
      .catch((err)=>{
        done(err)
      })
    })
  })

})
