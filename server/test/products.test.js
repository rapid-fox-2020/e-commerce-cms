const request = require('supertest')
const app = require('../app')
const { encode } = require('../helper/jwt')
const { User, Product, sequelize } = require('../models')
const { queryInterface } = sequelize

let access_token = ''
let error_token = ''
let globalId = null

const inputAdmin = {
    email: 'admin@mail.com',
    password: '12345',
    role: 'admin'
}

const inputUser = {
    email: 'user@mail.com',
    password: '12345',
    role: 'user'
}

beforeAll((done) => {
    User.findOne(
        {
            where: { email: inputAdmin.email }
        })
        .then((user) => {
            if (user) {
                return user
            } else {
                return User.create(inputAdmin)
            }
        })
        .then((user) => {
            access_token = encode({
                id: user.id,
                email: user.email,
                role: user.role
            }, process.env.SECRET )
            done()
        })
        .catch((err) => {
            done(err)
        })
});

//Clear db
afterAll((done) => {
    queryInterface.bulkDelete(`Products`, {})
    .then((result) => {
       return queryInterface.bulkDelete(`Users`, {})
    })
    .then(() => {
        done()
    })
    .catch((err) => {
        done(err)
    });
})

/** ======== TEST RESPONSE PRODUCT ========*/
const testProduct = {
    name: 'Macbook',
    image_url: 'https://zdnet2.cbsistatic.com/hub/i/2018/08/23/ee30e744-889f-4df4-86db-cdac30453d08/apple-mbp-15-header.jpg',
    price: 24000000,
    stock: 5
}

describe('POST /products', () => {
    console.log(`ini id post >>>> ', ${globalId}`);

    test('Create Product Success', (done) => {
      return request(app)
        .post('/products')
        .send(testProduct)
        .set('access_token', access_token)
        .set('Accept', 'application/json')
        .then(response => {
            const { status, body } = response;
            expect(status).toBe(201);
            expect(body).toHaveProperty('id', expect.any(Number))
            expect(body).toHaveProperty('name', testProduct.name)
            expect(body).toHaveProperty('image_url', testProduct.image_url)
            expect(body).toHaveProperty('price', testProduct.price)
            expect(body).toHaveProperty('stock', testProduct.stock)
            console.log('ini dari post', body.id);
            globalId = body.id
            done();
        })
        .catch(err => {
            console.log(err);
            done(err);
        })
    });

    test(`Create Product with an Empty "name"`, (done) => {
        const dataTest = {
            name: '',
            image_url: 'https://zdnet2.cbsistatic.com/hub/i/2018/08/23/ee30e744-889f-4df4-86db-cdac30453d08/apple-mbp-15-header.jpg',
            price: 23000000,
            stock: 3
        }
        return request(app)
        .post('/products')
        .set('access_token', access_token)
        .set('Accept', 'application/json')
        .send(dataTest)
        .then((response) => {
            const { status, body } = response;
            expect(status).toBe(400);
            expect(body).toBe('name cannot be empty');
            done();
        })
        .catch(err => {
            done(err);
        })
    });

    test(`Create Product with wrong "image_url" format`, (done) => {
        const dataTest = {
            name: 'Macbook',
            image_url: 'MacbokUrl',
            price: 23000000,
            stock: 3
        }
        return request(app)
        .post('/products')
        .set('access_token', access_token)
        .set('Accept', 'application/json')
        .send(dataTest)
        .then((response) => {
            const { status, body } = response;
            expect(status).toBe(400);
            expect(body).toBe('incorrect format for image url');
            done();
        })
        .catch(err => {
            done(err);
        })
    });

    test(`Create Product with negative "price" value`, (done) => {
        const dataTest = {
            name: 'Macbook',
            image_url: 'https://zdnet2.cbsistatic.com/hub/i/2018/08/23/ee30e744-889f-4df4-86db-cdac30453d08/apple-mbp-15-header.jpg',
            price: -1,
            stock: 3
        }
        return request(app)
        .post('/products')
        .set('access_token', access_token)
        .set('Accept', 'application/json')
        .send(dataTest)
        .then((response) => {
            const { status, body } = response;
            expect(status).toBe(400);
            expect(body).toBe('price must be equal or greater than 0');
            done();
        })
        .catch(err => {
            done(err);
        })
    });

    test(`Create Product with negative "stock" value`, (done) => {
        const dataTest = {
            name: 'Macbook',
            image_url: 'https://zdnet2.cbsistatic.com/hub/i/2018/08/23/ee30e744-889f-4df4-86db-cdac30453d08/apple-mbp-15-header.jpg',
            price: 23000000,
            stock: -3
        }
        return request(app)
        .post('/products')
        .set('access_token', access_token)
        .set('Accept', 'application/json')
        .send(dataTest)
        .then((response) => {
            const { status, body } = response;
            expect(status).toBe(400);
            expect(body).toBe('stock must be equal or greater than 0');
            done();
        })
        .catch(err => {
            done(err);
        })
    });
    
});

describe('GET/products', () => {

    test('Get All Products', (done) => {
        return request(app)
            .get('/products')
            .send()
            .set('access_token', access_token)
            .set('Accept', 'application/json')
            .then(response => {
                const { body, status } = response
                expect(status).toBe(200)
                expect(Array.isArray(body)).toBeTruthy();
                done()
            })
            .catch((err) => {
                done(err)
            })
    })

})

describe('GET/products/:id', () => {

    test('Get One Product', (done) => {
        return request(app)
            .get(`/products/${globalId}`)
            .set('access_token', access_token)
            .set('Accept', 'application/json')
            .send()
            .then((response) => {
                const { body, status } = response
                expect(status).toBe(200)
                expect(body).toHaveProperty('name', expect.any(String));
                done()
            })
            .catch((err) => {
                done(err)
            })
    })

    test('Get One Product with wrong "id"', (done) => {
        return request(app)
            .get(`/products/15`)
            .set('access_token', access_token)
            .set('Accept', 'application/json')
            .then((response) => {
                const { status, body } = response;
                expect(status).toBe(404);
                expect(body).toHaveProperty('message' ,'Product not Found');
                done();
            })
            .catch(err => {
                console.log(err);
                done(err);
            })
    });

})

const testEditProduct = {
    name: 'Macbook edit',
    image_url: 'https://i.imgur.com/Bcz59cD.png',
    price: 23000000,
    stock: 8
}

describe('PUT/products/:id', () => {

    test('Update Product Success', (done) => {
        return request(app)
            .put(`/products/${globalId}`)
            .set('access_token', access_token)
            .set('Accept', 'application/json')
            .send(testEditProduct)
        .then(response => {
            const { status, body } = response;
            expect(status).toBe(200);
            expect(body).toHaveProperty('name', testEditProduct.name)
            expect(body).toHaveProperty('image_url', testEditProduct.image_url)
            expect(body).toHaveProperty('price', testEditProduct.price)
            expect(body).toHaveProperty('stock', testEditProduct.stock)
            done();
        })
        .catch(err => {
            done(err);
        })
    });

    test(`Update Product with wrong params.id`, (done) => {
        request(app)
            .put(`/products/15`)
            .set('access_token', access_token)
            .set('Accept', 'application/json')
            .send(testEditProduct)
        .then((response) => {
            const { status, body } = response;
            expect(status).toBe(404);
            expect(body).toHaveProperty('message', 'Product not found');
            done();
        })
        .catch(err => {
            console.log(err);
            done(err);
        })
    });

    test(`Update Product with an Empty "name"`, (done) => {
        const dataTest = {
            name: '',
            image_url: 'https://i.imgur.com/Bcz59cD.png',
            price: 23000000,
            stock: 8
        }
        return request(app)
            .put(`/products/${globalId}`)
            .set('access_token', access_token)
            .set('Accept', 'application/json')
            .send(dataTest)
        .then((response) => {
            const { status, body } = response;
            expect(status).toBe(400);
            expect(body).toBe('name cannot be empty');
            done();
        })
        .catch(err => {
            done(err);
        })
    });

    test(`Update Product with wrong "image_url" format`, (done) => {
        const dataTest = {
            name: 'Macbook',
            image_url: 'MacbokUrl',
            price: 23000000,
            stock: 3
        }
        return request(app)
            .put(`/products/${globalId}`)
            .set('access_token', access_token)
            .set('Accept', 'application/json')
            .send(dataTest)
        .then((response) => {
            const { status, body } = response;
            expect(status).toBe(400);
            expect(body).toBe('incorrect format for image url');
            done();
        })
        .catch(err => {
            done(err);
        })
    });

    test(`Update Product with negative "price" value`, (done) => {
        const dataTest = {
            name: 'Macbook',
            image_url: 'https://zdnet2.cbsistatic.com/hub/i/2018/08/23/ee30e744-889f-4df4-86db-cdac30453d08/apple-mbp-15-header.jpg',
            price: -1,
            stock: 3
        }
        return request(app)
            .put(`/products/${globalId}`)
            .set('access_token', access_token)
            .set('Accept', 'application/json')
            .send(dataTest)
        .then((response) => {
            const { status, body } = response;
            expect(status).toBe(400);
            expect(body).toBe('price must be equal or greater than 0');
            done();
        })
        .catch(err => {
            done(err);
        })
    });

    test(`Update Product with negative "stock" value`, (done) => {
        const dataTest = {
            name: 'Macbook',
            image_url: 'https://zdnet2.cbsistatic.com/hub/i/2018/08/23/ee30e744-889f-4df4-86db-cdac30453d08/apple-mbp-15-header.jpg',
            price: 23000000,
            stock: -3
        }
        return request(app)
            .put(`/products/${globalId}`)
            .set('access_token', access_token)
            .set('Accept', 'application/json')
            .send(dataTest)
        .then((response) => {
            const { status, body } = response;
            expect(status).toBe(400);
            expect(body).toBe('stock must be equal or greater than 0');
            done();
        })
        .catch(err => {
            done(err);
        })
    });

})

describe('DELETE/products/id', () => {

    test('Delete Product', (done) => {
        return request(app)
            .delete(`/products/${globalId}`)
            .set('access_token', access_token)
            .set('Accept', 'application/json')
        .then((response) => {
            const { body, status } = response
            expect(status).toBe(200)
            expect(body).toHaveProperty('id', globalId);
            done()
        })
        .catch((err) => {
            console.log(err);
            done(err)
        })
    })

    test(`Delete Product with wrong id`, (done) => {
        const dataTest = {
            name: 'Macbook edit',
            image_url: 'https://zdnet2.cbsistatic.com/hub/i/2018/08/23/ee30e744-889f-4df4-86db-cdac30453d08/apple-mbp-15-header.jpg',
            price: 23000000,
            stock: 3
        }
        return request(app)
            .delete(`/products/16`)
            .set('access_token', access_token)
            .set('Accept', 'application/json')
            .send(dataTest)
        .then((response) => {
            const { status, body } = response;
            expect(status).toBe(404);
            expect(body).toHaveProperty('message', 'Product not Found');
            done();
        })
        .catch(err => {
            console.log(err);
            done(err);
        })
    });

})