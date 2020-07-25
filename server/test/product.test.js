const request = require('supertest')
const app = require('../app')
const {User, sequelize} = require ('../models')
const jwt = require('jsonwebtoken')
const {queryInterface} = sequelize
let idProduct = null

let dataProduct = {
    name: 'Liquid vape',
    img_url: `www.liquid.com`,
    price: 250000,
    stock: 5
}
const userTest = {
    email: `admin@email.com`,
    password: `1234`
}
let token = ``
beforeAll((done) => {
    // Clears the database and adds some testing data.
    // Jest will wait for this promise to resolve before running tests.
    User.findOne({
        where: {
            email: userTest.email
        }
    })
        .then(user => {
            token = jwt.sign({
                id: user.id,
                email: user.email
            }, process.env.SECRET)
            done()
        })
        .catch(err => {
            console.log(err)
            done()
        })
});

afterAll(done => {
    queryInterface.bulkDelete("Products", {})
        .then(data => {
            done();
        })
        .catch(err => {
            done(err);
        })
})

describe('POST /products', function () {
    it('responds with json', function (done) {
        request(app)
            .post('/products')
            .set('Accept', 'application/json')
            .set('token', token)
            .send(dataProduct)
            .then(response => {
                const { status, body } = response
                expect(status).toBe(201)
                expect(body).toHaveProperty(`img_url`, dataProduct.img_url)
                // console.log('>>>>', body)
                idProduct = body.id
                done()
            })
            .catch(err => {
                console.log(err)
                done(err)
            })
    });
});

describe('GET /products', function () {
    it('responds with json', function (done) {
        request(app)
            .get('/products')
            .set('Accept', 'application/json')
            .set('token', token)
            .send()
            .then(response => {
                const { status, body } = response
                expect(status).toBe(200)
                expect(Array.isArray([body])).toBe(true)
                // console.log('>>>>', body)
                done()
            })
            .catch(err => {
                console.log(err)
                done(err)
            })
    });
});

describe('PUT /products', function () {
    it('responds with json', function (done) {
        request(app)
            .put(`/products/${idProduct}`)
            .set('Accept', 'application/json')
            .set('token', token)
            .then(response => {
                const { status, body } = response
                expect(status).toBe(200)
                expect(Array.isArray([body])).toBe(true)
                done()
            })
            .catch(err => {
                console.log(err)
                done(err)
            })
    });
});

describe('DELETE /products', function () {
    it('responds with json', function (done) {
        request(app)
            .delete(`/products/${idProduct}`)
            .set('Accept', 'application/json')
            .set('token', token)
            .then(response => {
                const { status, body } = response
                expect(status).toBe(200)
                expect(body).toHaveProperty(`msg`, expect.any(String))
                done()
            })
            .catch(err => {
                console.log(err)
                done(err)
            })
    });
});
