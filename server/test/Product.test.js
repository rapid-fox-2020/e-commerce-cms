const request = require('supertest');
const app = require('../app');
const { encode, decode } = require('../helper/jwt')
const { User, sequelize } = require('../models')
const { queryInterface, Sequelize } = sequelize


const productTest = {
    name: 'Eskrim',
    image_url: 'gambar eskrim',
    price: 2000000000,
    stock: 2
}

const productTestError = {
    name: '',
    image_url: '',
    price: 0,
    stock: 0
}

const userTest = {
    email: 'admin@mail.com',
    password: 'test',
}

const productResult = [{
    name: 'Eskrim',
    image_url: 'gambar eskrim',
    price: 2000000000,
    stock: 1
}]

let newProduct = null
let access_token = ''

beforeAll(done => {
    // Clears the database and adds some testing data.
    // Jest will wait for this promise to resolve before running tests.    
    User.findOne({ where: { email: userTest.email } })
        .then((result) => {
            access_token = encode(result.id, userTest.email);
            return queryInterface.bulkInsert('Products', [{
                name: 'Eskrim',
                image_url: 'gambar eskrim',
                price: 2000000000,
                stock: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            }], {});
        })
        .then(result => {
            done();
        })
        .catch((err) => {
            done(err)
        });
});

afterAll(done => {
    queryInterface.dropTable('Products')
        .then(data => {
            return queryInterface.createTable('Products', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
                },
                name: {
                    type: Sequelize.STRING
                },
                image_url: {
                    type: Sequelize.STRING
                },
                price: {
                    type: Sequelize.FLOAT
                },
                stock: {
                    type: Sequelize.INTEGER
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE
                }
            })
        })
        .then(result => {
            done()
        })
        .catch(err => {
            done(err);
        })
});

describe('POST /products', function() {
    it('responds with json', function(done) {
        request(app)
            .post('/products')
            .send(productTest)
            .set('access_token', access_token)
            .set('Accept', 'application/json')
            // .expect('Content-Type', /json/)
            .then((result) => {
                const { status, body } = result
                newProduct = body
                expect(status).toBe(201)
                expect(body.name).toEqual(expect.any(String))
                expect(body.image_url).toEqual(expect.any(String))
                expect(body.price).toEqual(expect.any(Number))
                expect(body.stock).toEqual(expect.any(Number))
                done();
            }).catch((err) => {
                done(err);
            });
    });

    it('responds failed create -wrong name, image_url, price, stock', function(done) {
        request(app)
            .post('/products')
            .send(productTestError)
            .set('access_token', access_token)
            .set('Accept', 'application/json')
            // .expect('Content-Type', /json/)
            .then((result) => {
                const { status, body } = result
                expect(status).toBe(400)
                expect(body).toHaveProperty('message');
                done();
            }).catch((err) => {
                done(err);
            });
    });
});

describe('GET /products', function() {
    it('responds with json', function(done) {
        request(app)
            .get('/products')
            .set('access_token', access_token)
            .set('Accept', 'application/json')
            // .expect('Content-Type', /json/)
            .then((result) => {
                const { status, body } = result;
                expect(status).toBe(200)
                expect(Array.isArray(body)).toBeTruthy();
                expect(body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining(newProduct)
                    ]))
                expect(body[0].name).toEqual(expect.any(String))
                expect(body[0].image_url).toEqual(expect.any(String))
                expect(body[0].price).toEqual(expect.any(Number))
                expect(body[0].stock).toEqual(expect.any(Number))
                done();
            }).catch((err) => {
                done(err);
            });
    });

    it('responds with error access_token', function(done) {
        request(app)
            .get('/products')
            .set('access_token', 'afaf')
            .set('Accept', 'application/json')
            // .expect('Content-Type', /json/)
            .then((result) => {
                const { status, body } = result;
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', 'jwt malformed');
                done();
            }).catch((err) => {
                done(err);
            });
    });
});



describe('GET /products/:id', function() {
    it('responds with json', function(done) {
        request(app)
            .get('/products/1')
            .set('access_token', access_token)
            .set('Accept', 'application/json')
            // .expect('Content-Type', /json/)
            .then((result) => {
                const { status, body } = result
                expect(status).toBe(200)
                expect(body.name).toEqual(expect.any(String))
                expect(body.image_url).toEqual(expect.any(String))
                expect(body.price).toEqual(expect.any(Number))
                expect(body.stock).toEqual(expect.any(Number))
                done();
            }).catch((err) => {
                done(err);
            });
    });

    it('responds with json error access_token', function(done) {
        request(app)
            .get('/products/1')
            .set('access_token', 'asdad')
            .set('Accept', 'application/json')
            // .expect('Content-Type', /json/)
            .then((result) => {
                const { status, body } = result
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', 'jwt malformed');
                done();
            }).catch((err) => {
                done(err);
            });
    });

    it('responds with fail 404 not Found', function(done) {
        request(app)
            .get('/products/5')
            .set('access_token', access_token)
            .set('Accept', 'application/json')
            // .expect('Content-Type', /json/)
            .then((result) => {
                const { status, body } = result
                expect(status).toBe(404)
                expect(body).toHaveProperty('message', 'Product tidak di temukan');
                done();
            }).catch((err) => {
                done(err);
            });
    });
});




describe('PUT /products/:id', function() {
    it('responds with json', function(done) {
        request(app)
            .put('/products/1')
            .send(productTest)
            .set('access_token', access_token)
            .set('Accept', 'application/json')
            // .expect('Content-Type', /json/)
            .then((result) => {
                const { status, body } = result
                expect(status).toBe(200)
                expect(body[0].name).toEqual(expect.any(String))
                expect(body[0].image_url).toEqual(expect.any(String))
                expect(body[0].price).toEqual(expect.any(Number))
                expect(body[0].stock).toEqual(expect.any(Number))
                done();
            }).catch((err) => {
                done(err);
            });
    });

    it('responds with failed updated -wrong name, image_url, price, stock', function(done) {
        request(app)
            .put('/products/1')
            .send(productTestError)
            .set('access_token', access_token)
            .set('Accept', 'application/json')
            // .expect('Content-Type', /json/)
            .then((result) => {
                const { status, body } = result
                expect(status).toBe(400)
                expect(body).toHaveProperty('message');
                done();
            }).catch((err) => {
                done(err);
            });
    });
});


describe('DELETE /products/:id', function() {
    it('responds with json', function(done) {
        request(app)
            .delete('/products/1')
            .set('access_token', access_token)
            .set('Accept', 'application/json')
            // .expect('Content-Type', /json/)
            .then((result) => {
                const { status, body } = result
                expect(status).toBe(200)
                expect(body).toHaveProperty('deleted')
                done();
            }).catch((err) => {
                done(err);
            });
    });

    it('responds with fail 404 not Found', function(done) {
        request(app)
            .delete('/products/10')
            .set('access_token', access_token)
            .set('Accept', 'application/json')
            // .expect('Content-Type', /json/)
            .then((result) => {
                const { status, body } = result
                expect(status).toBe(404)
                expect(body).toHaveProperty('message')
                done();
            }).catch((err) => {
                done(err);
            });
    });

});