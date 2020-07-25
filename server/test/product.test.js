const request = require('supertest')
const app = require('../app')
const { User, sequelize } = require('../models')
const jwt = require(`jsonwebtoken`)
const { queryInterface } = sequelize

let dataProduct = {
    name: 'Baju',
    image_url: `www.img.com`,
    price: 20000,
    stock: 5
}

const userTest = {
    email: `admin@mail.com`,
    password: `1234`
}

let access_token = ``

beforeAll((done) => {
    // Clears the database and adds some testing data.
    // Jest will wait for this promise to resolve before running tests.
    User.findOne({
        where: {
            email: userTest.email
        }
    })
        .then(user => {
            access_token = jwt.sign({
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
            .set('access_token', access_token)
            .send(dataProduct)
            .then(response => {
                const { status, body } = response
                expect(status).toBe(201)
                expect(body).toHaveProperty(`image_url`, dataProduct.image_url)
                // console.log('>>>>', body)
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
            .set('access_token', access_token)
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

describe('DELETE /products', function () {
    it('responds with json', function (done) {
        request(app)
            .delete('/products/5')
            .set('Accept', 'application/json')
            .set('access_token', access_token)
            .then(response => {
                const { status, body } = response
                expect(status).toBe(200)
                expect(body).toHaveProperty(`message`, expect.any(String))
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
            .put('/products/5')
            .set('Accept', 'application/json')
            .set('access_token', access_token)
            .then(response => {
                const { status, body } = response
                expect(status).toBe(200)
                expect(body).toHaveProperty(`message`, expect.any(String))
                done()
            })
            .catch(err => {
                console.log(err)
                done(err)
            })
    });
});