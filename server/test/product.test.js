const request = require('supertest')
const app = require('../app.js')
const { User, sequelize } = require('../models')
const { encode } = require('../helper/jwt')
const { queryInterface } = sequelize

const testProduct = {
  name: 'Laptop',
  img_url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
  price: 5000000,
  stock: 5
}

const testUser = {
  email: 'admin1@mail.com',
  password: '12345',
  role: 'Admin'
}

const testUserNonAdmin = {
  email: 'user@mail.com',
  password: '54321',
  role: 'User'
}

let access_token = ''
let error_token = ''
let globalId = null

//Login Admin
beforeAll((done) => {
  User.findOne(
    {
      where: { email: testUser.email }
    })
    .then((result) => {
      access_token = encode({
        id: result.id,
        email: result.email
      })
      done()
    })
    .catch((err) => {
      done(err)
    })
});

//Login Non Admin
beforeAll((done) => {
  User.create(testUserNonAdmin)
    .then((result) => {
      error_token = encode({
        id: result.id,
        email: result.email
      })
      done()
    })
    .catch((err) => {
      done(err)
    })
});


afterAll(done => {
  User.destroy({ where: { email: testUserNonAdmin.email } })
    .then((result) => {
      done()
    })
    .catch((err)=>{
      done(err)
    })

  queryInterface.bulkDelete('Products', {})
    .then(result => {
      done()
    })
    .catch(err => {
      done(err)
    })
})

describe('POST/products', () => {
  test('post response json', (done) => {
    request(app)
      .post('/products')
      .send(testProduct)
      .set('access_token', access_token)
      .set('Accept', 'application/json')
      .then(response => {
        const { body, status } = response
        expect(status).toBe(201)
        expect(body).toHaveProperty('id', expect.any(Number))
        expect(body).toHaveProperty('name', testProduct.name)
        expect(body).toHaveProperty('img_url', testProduct.img_url)
        expect(body).toHaveProperty('price', testProduct.price)
        expect(body).toHaveProperty('stock', testProduct.stock)
        globalId = body.id
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  test('post response name must be filled', (done) => {
    request(app)
      .post('/products')
      .send({
        name: '',
        img_url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
        price: 5000000,
        stock: 5
      })
      .set('access_token', access_token)
      .set('Accept', 'application/json')
      .then(response => {
        const { body, status } = response
        expect(status).toBe(400)
        expect(Array.isArray([body])).toBe(true)
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  test('post response img_url must be filled', (done) => {
    request(app)
      .post('/products')
      .send({
        name: 'Laptop',
        img_url: '',
        price: 5000000,
        stock: 5
      })
      .set('access_token', access_token)
      .set('Accept', 'application/json')
      .then(response => {
        const { body, status } = response
        expect(status).toBe(400)
        expect(Array.isArray([body])).toBe(true)
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  test('post response price must be filled', (done) => {
    request(app)
      .post('/products')
      .send({
        name: 'Laptop',
        img_url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
        price: '',
        stock: 5
      })
      .set('access_token', access_token)
      .set('Accept', 'application/json')
      .then(response => {
        const { body, status } = response
        expect(status).toBe(400)
        expect(Array.isArray([body])).toBe(true)
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  test('post response stock must be filled', (done) => {
    request(app)
      .post('/products')
      .send({
        name: 'Laptop',
        img_url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
        price: 500000,
        stock: ''
      })
      .set('access_token', access_token)
      .set('Accept', 'application/json')
      .then(response => {
        const { body, status } = response
        expect(status).toBe(400)
        expect(Array.isArray([body])).toBe(true)
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  test('post response price minimal 0', (done) => {
    request(app)
      .post('/products')
      .send({
        name: 'Laptop',
        img_url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
        price: -1,
        stock: 10
      })
      .set('access_token', access_token)
      .set('Accept', 'application/json')
      .then(response => {
        const { body, status } = response
        expect(status).toBe(400)
        expect(Array.isArray([body])).toBe(true)
        done()
      })
      .catch((err) => {
        done(err)
      })
  })


  test('post response stock minimal 0', (done) => {
    request(app)
      .post('/products')
      .send({
        name: 'Laptop',
        img_url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
        price: 5000000,
        stock: -10
      })
      .set('access_token', access_token)
      .set('Accept', 'application/json')
      .then(response => {
        const { body, status } = response
        expect(status).toBe(400)
        expect(Array.isArray([body])).toBe(true)
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  test('post response access_token', (done) => {
    request(app)
      .post('/products')
      .send(testProduct)
      .set('Accept', 'application/json')
      .then(response => {
        const { body, status } = response
        expect(status).toBe(404)
        expect(body).toHaveProperty('message', 'Data not found')
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

})

describe('GET/products', () => {
  test('get response json', (done) => {
    request(app)
      .get('/products')
      .send()
      .set('access_token', access_token)
      .set('Accept', 'application/json')
      .then(response => {
        const { body, status } = response
        expect(status).toBe(200)
        expect(Array.isArray([body])).toBe(true)
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  test('put response access_token', (done) => {
    request(app)
      .post('/products')
      .send(testProduct)
      .set('Accept', 'application/json')
      .then(response => {
        const { body, status } = response
        expect(status).toBe(404)
        expect(body).toHaveProperty('message', 'Data not found')
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
})

describe('PUT/products/id', () => {
  test('put response json', (done) => {
    request(app)
      .put(`/products/${globalId}`)
      .set('access_token', access_token)
      .set('Accept', 'application/json')
      .then(response => {
        const { body, status } = response
        expect(status).toBe(200)
        expect(Array.isArray([body])).toBe(true)
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  test('put response failed access_token', (done) => {
    request(app)
      .put(`/products/${globalId}`)
      .set('Accept', 'application/json')
      .then(response => {
        const { body, status } = response
        expect(status).toBe(404)
        expect(body).toHaveProperty('message', 'Data not found')
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
})

describe('DELETE/products/id', () => {
  test('delete response json', (done) => {
    request(app)
      .delete(`/products/${globalId}`)
      .set('access_token', access_token)
      .set('Accept', 'application/json')
      .then(response => {
        const { body, status } = response
        expect(status).toBe(200)
        expect(Array.isArray([body])).toBe(true)
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  test('delete response failed access_token', (done) => {
    request(app)
      .delete(`/products/${globalId}`)
      .set('Accept', 'application/json')
      .then(response => {
        const { body, status } = response
        expect(status).toBe(404)
        expect(body).toHaveProperty('message', 'Data not found')
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
})

describe('Error authorization', () => {
  test('error authorization response code 403', (done) => {
    request(app)
      .post(`/products/`)
      .send(testUserNonAdmin)
      .set('access_token', error_token)
      .set('Accept', 'application/json')
      .then(response => {
        const { body, status } = response
        expect(status).toBe(403)
        expect(body).toHaveProperty("message", 'Forbidden Access')
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
}) 