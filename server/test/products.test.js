const request = require('supertest')
const app = require('../app')


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
    User.create(inputAdmin)

        .then((resultAdmin) => {
            access_token = encode({
                id: resultAdmin.id,
                email: resultAdmin.email
            })
            User.create(inputUser)
            .then((resultUser) => {
                error_token = encode({
                    id: resultUser.id,
                    email: resultUser.email
                })
            })
        })
        .catch((err) => {
            done(err)
        })

    done()
});

//Clear db
afterAll( async (done) => {
    try {
        await queryInterface.bulkDelete(`Products`, {})
        await queryInterface.bulkDelete(`Users`, {})
        done()
    } catch(err) {
        done(err)
    }
});


/** ======== TEST RESPONSE SUCCESS ========*/
const testProduct = {
    name: 'Macbook',
    img_url: 'https://zdnet2.cbsistatic.com/hub/i/2018/08/23/ee30e744-889f-4df4-86db-cdac30453d08/apple-mbp-15-header.jpg',
    price: 24000000,
    stock: 5
}

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
})

describe('GET/products', () => {
    test('Get All Products', (done) => {
        request(app)
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
        request(app)
            .get(`/products/${globalId}`)
            .send()
            .set('access_token', access_token)
            .set('Accept', 'application/json')
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
})

const testEditProduct = {
    name: 'Macbook edit',
    img_url: 'https://zdnet2.cbsistatic.com/hub/i/2018/08/23/ee30e744-889f-4df4-86db-cdac30453d08/apple-mbp-15-header.jpg',
    price: 23000000,
    stock: 3
}

describe('PUT/products/id', () => {
    test('Update Product', (done) => {
        request(app)
            .put(`/products/${globalId}`)
            .set('access_token', access_token)
            .set('Accept', 'application/json')
            .send(testEditProduct)
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
})

describe('DELETE/products/id', () => {
    test('Delete Product', (done) => {
        request(app)
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
})

/** ======== TEST RESPONSE ERROR ========*/

describe('POST /products', () => {
    test(`Create Product with an Empty "name"`, (done) => {
        const dataTest = {
            name: '',
            image_url: 'https://zdnet2.cbsistatic.com/hub/i/2018/08/23/ee30e744-889f-4df4-86db-cdac30453d08/apple-mbp-15-header.jpg',
            price: 23000000,
            stock: 3
        }
        request(app)
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
            console.log(err);
            done(err);
        })
    });
});

describe('POST /products', () => {
    test(`Create Product with wrong "image_url" format`, (done) => {
        const dataTest = {
            name: 'Macbook',
            image_url: 'macbookUrl',
            price: 23000000,
            stock: 3
        }
        request(app)
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
            console.log(err);
            done(err);
        })
    });
});

describe('POST /products', () => {
    test(`Create Product with negative "price" value`, (done) => {
        const dataTest = {
            name: 'Macbook',
            image_url: 'https://zdnet2.cbsistatic.com/hub/i/2018/08/23/ee30e744-889f-4df4-86db-cdac30453d08/apple-mbp-15-header.jpg',
            price: -1,
            stock: 3
        }
        request(app)
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
            console.log(err);
            done(err);
        })
    });
});

describe('POST /products', () => {
    test(`Create Product with negative "stock" value`, (done) => {
        const dataTest = {
            name: 'Macbook',
            image_url: 'https://zdnet2.cbsistatic.com/hub/i/2018/08/23/ee30e744-889f-4df4-86db-cdac30453d08/apple-mbp-15-header.jpg',
            price: 23000000,
            stock: -1
        }
        request(app)
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
            console.log(err);
            done(err);
        })
    });
});

describe('GET /products/:id', () => {
    test('Get One Product without "access_token"', (done) => {
        request(app)
            .get(`/products/${globalId}`)
            // .set('access_token', access_token)
            .set('Accept', 'application/json')
            .then((response) => {
            const { status, body } = response;
                expect(status).toBe(400);
                expect(body).toBe('invalid token');
                done();
            })
            .catch(err => {
                console.log(err);
                done(err);
            })
    });
});

describe('PUT /products/:id', () => {
    test(`Update Product with wrong params.id`, (done) => {
        const dataTest = {
            name: 'Macbook edit',
            image_url: 'https://zdnet2.cbsistatic.com/hub/i/2018/08/23/ee30e744-889f-4df4-86db-cdac30453d08/apple-mbp-15-header.jpg',
            price: 23000000,
            stock: 3
        }
        request(app)
            .put(`/products/${15}`)
            .set('access_token', access_token)
            .set('Accept', 'application/json')
            .send(dataTest)
        .then((response) => {
            const { status, body } = response;
            expect(status).toBe(404);
            expect(body).toBe('Product with id 15 not found');
            done();
        })
        .catch(err => {
            console.log(err);
            done(err);
        })
    });
});

describe('PUT /products/:id', () => {
    test(`Update Product with an Empty "name"`, (done) => {
        const dataTest = {
            name: '',
            image_url: 'https://zdnet2.cbsistatic.com/hub/i/2018/08/23/ee30e744-889f-4df4-86db-cdac30453d08/apple-mbp-15-header.jpg',
            price: 23000000,
            stock: 3
        }
        request(app)
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
            console.log(err);
            done(err);
        })
    });
});

describe('PUT /products/:id', () => {
    test(`Update Product with wrong "image_url" format`, (done) => {
        const dataTest = {
            name: 'Macbook edit',
            image_url: 'macbokUrl',
            price: 23000000,
            stock: 3
        }
        request(app)
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
            console.log(err);
            done(err);
        })
    });
});

describe('PUT /products/:id', () => {
    test(`Update Product with negative "price" value`, (done) => {
        const dataTest = {
            name: 'Macbook edit',
            image_url: 'https://zdnet2.cbsistatic.com/hub/i/2018/08/23/ee30e744-889f-4df4-86db-cdac30453d08/apple-mbp-15-header.jpg',
            price: -1,
            stock: 3
        }
        request(app)
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
            console.log(err);
            done(err);
        })
    });
});

describe('PUT /products/:id', () => {
    test(`Update Product with negative "stock" value`, (done) => {
        const dataTest = {
            name: 'Macbook edit',
            image_url: 'https://zdnet2.cbsistatic.com/hub/i/2018/08/23/ee30e744-889f-4df4-86db-cdac30453d08/apple-mbp-15-header.jpg',
            price: 23000000,
            stock: -1
        }
        request(app)
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
            console.log(err);
            done(err);
        })
    });
});

describe('DELETE /products/:id', () => {
    test(`Delete Product with wrong id`, (done) => {
        const dataTest = {
            name: 'Macbook edit',
            image_url: 'https://zdnet2.cbsistatic.com/hub/i/2018/08/23/ee30e744-889f-4df4-86db-cdac30453d08/apple-mbp-15-header.jpg',
            price: 23000000,
            stock: 3
        }
        request(app)
            .delete(`/products/${16}`)
            .set('access_token', access_token)
            .set('Accept', 'application/json')
            .send(dataTest)
        .then((response) => {
            const { status, body } = response;
            expect(status).toBe(404);
            expect(body).toBe('Product with id 16 not found');
            done();
        })
        .catch(err => {
            console.log(err);
            done(err);
        })
    });
});