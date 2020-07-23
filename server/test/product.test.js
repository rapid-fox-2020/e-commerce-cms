require('dotenv').config()
const request = require('supertest')
const server = require('../server.js')
const { sequelize } = require('../models')
const { queryInterface } = sequelize
const { User } = require('../models')
const { encode } = require('../helpers/jwt')

let access_token = ""
let product;

afterAll( (done) => {
    queryInterface.bulkDelete("Users", null, {})
    .then(data => {
        return queryInterface.bulkDelete("Products", null, {})
    })
    .then(deleteProduct => {
        done()
    })
    .catch(err => {
        done(err)
    })
})
beforeAll ((done) => {
    User.create({
        email: 'test@admin.com',
        password: '1234',
        role: 'admin',
    })
    .then(newUser => {
        access_token = encode(newUser.dataValues)
        done()
    })
    .catch(err => {
        done (err)
    })
})

describe("Product Routes", () => {
    // test("401 Unauthorized - should return json message", (done) => {
    //     return request(server)
    //             .get('/products')
    //             .set("Accept", "application/json")
    //             .set("access_token", "sadsaddasdasdnbvas")
    //             .then(result => {
    //                 console.log(result, '<< ini result');
    //                 const { body, status } = result
    //                 expect(status).toBe(401)
    //                 expect(body).toHaveProperty("message", "Not authroized to do the actions")
    //                 done()
    //             })
    //             .catch (err => {
    //                 console.log(err, 'ini err <<<');
    //                 done (err)
    //             })
    // })
    describe("POST /products", () => {
        test("201 created - should return json message", (done) => {
            const newProduct = {
                name: "windows",
                image_url: "https://www.google.com/",
                price: 2000000,
                stock: 10,
            }
            return request(server)
                .post(`/products`)
                .set("Accept", "application/json")
                .set("access_token", access_token)
                .send(newProduct)
                .then(result => {
                    console.log('masuk<<');
                    console.log(result, '<<< ini result');
                    const { body, status } = result
                    expect(status).toBe(201)
                    expect(body).toHaveProperty("id")
                    expect(body).toHaveProperty("name")
                    expect(body).toHaveProperty("image_url")
                    expect(body).toHaveProperty("price")
                    expect(body).toHaveProperty("stock")
                    expect(body).toHaveProperty("createdAt")
                    expect(body).toHaveProperty("updatedAt")
                    product = body
                    console.log(product, 'ini hasil assign product');
                    done()
                })
                .catch (err => {
                    done (err)
                })
        })
        test("400 name cannot be empty! - should return json message", (done) => {
            const newProduct = {
                name: "",
                image_url: "https://www.google.com/",
                price: 2000000,
                stock: 10,
            }
            return request(server)
                .post(`/products/`)
                .set("Accept", "application/json")
                .set("access_token", access_token)
                .send(newProduct)
                .then(result => {
                    console.log('masuk sini');
                    const { body, status } = result
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("message", "name cannot be empty!")
                    done()
                })
                .catch (err => {
                    done (err)
                })
        })
        test("400 image_url cannot be empty! - should return json message", (done) => {
            const newProduct = {
                name: "windows",
                image_url: "",
                price: 2000000,
                stock: 10,
            }
            return request(server)
                .post(`/products/`)
                .set("Accept", "application/json")
                .set("access_token", access_token)
                .send(newProduct)
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("message", "image_url cannot be empty!")
                    done()
                })
                .catch (err => {
                    done (err)
                })
        })
        test("400 price cannot be empty! - should return json message", (done) => {
            const newProduct = {
                name: "windows",
                image_url: "https://www.google.com/",
                price: "",
                stock: 10,
            }
            return request(server)
                .post(`/products/`)
                .set("Accept", "application/json")
                .set("access_token", access_token)
                .send(newProduct)
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("message", "price cannot be empty!")
                    done()
                })
                .catch (err => {
                    done (err)
                })
        })
        test("400 name cannot be empty! - should return json message", (done) => {
            const newProduct = {
                name: "windows",
                image_url: "https://www.google.com/",
                price: 2000000,
                stock: "",
            }
            return request(server)
                .post(`/products/`)
                .set("Accept", "application/json")
                .set("access_token", access_token)
                .send(newProduct)
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("message", "stock cannot be empty!")
                    done()
                })
                .catch (err => {
                    done (err)
                })
        })
    })
    describe("GET /products/", () => {
        test("200 succes get all products - should return json message", (done) => {
            return request(server)
                .get('/products')
                .set("access_token", access_token)
                .set("Accept", "application/json")
                .then(result => {
                    const { body, status } = result
                    expect(status).toBe(200)
                    expect(body).toEqual(expect.any(Array))
                    done()
                })
                .catch(err => {
                    done (err)
                })
        })
    })
    describe("GET /products/:id", () => {
        test("200 succes get  product - should return json message", (done) => {
            return request(server)
                .get(`/products/${product.id}`)
                .set("access_token", access_token)
                .set("Accept", "application/json")
                .then(result => {
                    console.log(result, 'result <<<<<');
                    console.log(product.id, 'id <<<<<');
                    const { body, status } = result
                    expect(status).toBe(200)
                    expect(body).toHaveProperty("id")
                    expect(body).toHaveProperty("name")
                    expect(body).toHaveProperty("image_url")
                    expect(body).toHaveProperty("price")
                    expect(body).toHaveProperty("stock")
                    expect(body).toHaveProperty("createdAt")
                    expect(body).toHaveProperty("updatedAt")
                    done()
                })
                .catch(err => {
                    done (err)
                })
        })
        test("404 product not found - should return json message", (done) => {
            return request(server)
                .get(`/products/10000`)
                .set("access_token", access_token)
                .set("Accept", "application/json")
                .then(result => {
                    const { body, status } = result
                    expect(status).toBe(404)
                    expect(body).toHaveProperty("message", "product not found")
                    done()
                })
                .catch(err => {
                    done (err)
                })
        })
    })
    describe("PUT /product/:id", () => {
        test("200 succes updated product - should return json message", (done) => {
            const edittedProduct = {
                name: "linux",
                image_url: "https://www.google.com/",
                price: 1500000,
                stock: 5,
            }
            return request(server)
                .put(`/products/${product.id}`)
                .set("access_token", access_token)
                .set("Accept", "application/json")
                .send(edittedProduct)
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(200)
                    expect(body).toHaveProperty("id")
                    expect(body).toHaveProperty("name")
                    expect(body).toHaveProperty("image_url")
                    expect(body).toHaveProperty("price")
                    expect(body).toHaveProperty("stock")
                    expect(body).toHaveProperty("createdAt")
                    expect(body).toHaveProperty("updatedAt")
                    product = body
                    done()
                })
                .catch(err => {
                    done (err)
                })
        })
        test("400 name cannot be empty - should return json message", (done) => {
            const edittedProduct = {
                name: "",
                image_url: "https://www.google.com/",
                price: 1500000,
                stock: 5,
            }
            return request(server)
                .put(`/products/${product.id}`)
                .set("access_token", access_token)
                .set("Accept", "application/json")
                .send(edittedProduct)
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("message", "name cannot be empty")
                    done()
                })
                .catch(err => {
                    done (err)
                })
        })
        test("400 image_url cannot be empty - should return json message", (done) => {
            const edittedProduct = {
                name: "linux",
                image_url: "",
                price: 1500000,
                stock: 5,
            }
            return request(server)
                .put(`/products/${product.id}`)
                .set("access_token", access_token)
                .set("Accept", "application/json")
                .send(edittedProduct)
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("message", "image_url cannot be empty")
                    done()
                })
                .catch(err => {
                    done (err)
                })
        })
        test("400 price cannot be empty - should return json message", (done) => {
            const edittedProduct = {
                name: "linux",
                image_url: "https://www.google.com/",
                price: "",
                stock: 5,
            }
            return request(server)
                .put(`/products/${product.id}`)
                .set("access_token", access_token)
                .set("Accept", "application/json")
                .send(edittedProduct)
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("message", "price cannot be empty")
                    done()
                })
                .catch(err => {
                    done (err)
                })
        })
        test("400 stock cannot be empty - should return json message", (done) => {
            const edittedProduct = {
                name: "linux",
                image_url: "https://www.google.com/",
                price: 1500000,
                stock: "",
            }
            return request(server)
                .put(`/products/${product.id}`)
                .set("access_token", access_token)
                .set("Accept", "application/json")
                .send(edittedProduct)
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("message", "stock cannot be empty")
                    done()
                })
                .catch(err => {
                    done (err)
                })
        })
        test("404 product not found - should return json message", (done) => {
            const edittedProduct = {
                name: "linux",
                image_url: "https://www.google.com/",
                price: 1500000,
                stock: 5,
            }
            return request(server)
                .put(`/products/10000`)
                .set("access_token", access_token)
                .set("Accept", "application/json")
                .send(edittedProduct)
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(404)
                    expect(body).toHaveProperty("message", "product not found")
                    done()
                })
                .catch(err => {
                    done (err)
                })
        })
    })
    describe("DELETE /products/:id", () => {
        test("200 succes deleted product - should return json message", (done) => {
            console.log(product, 'ini product <<<');
            return request(server)
            .delete(`/products/${product.id}`)
            .set("access_token", access_token)
            .set("Accept", "application/json")
            .then(result => {
                console.log(result, '<<< ini result');
                    const { body, status } = result
                    expect(status).toBe(200)
                    expect(body).toHaveProperty("id")
                    expect(body).toHaveProperty("name")
                    expect(body).toHaveProperty("image_url")
                    expect(body).toHaveProperty("price")
                    expect(body).toHaveProperty("stock")
                    expect(body).toHaveProperty("createdAt")
                    expect(body).toHaveProperty("updatedAt")
                    done()
                })
                .catch(err => {
                    done (err)
                })
        })
        test("404 product not found - should return json message", (done) => {
            return request(server)
                .delete(`/products/1000`)
                .set("access_token", access_token)
                .set("Accept", "application/json")
                .then(result => {
                    const { body, status } = result
                    expect(status).toBe(404)
                    expect(body).toHaveProperty("message", "product not found")
                    done()
                })
                .catch(err => {
                    done (err)
                })
        })
    })
})