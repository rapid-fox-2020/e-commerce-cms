"use strict"

const request = require('supertest')
const app = require('../app.js')
const {User, Product, sequelize} = require('../models')
const {queryInterface} = sequelize
const {jwtSign} = require('../helpers/jwt')

describe("Product Routes", function(){
    let token = ''
    let token2 = ''
    let prodId = 0
    const tester = {
        name: "laptop",
        image_url: "https://i.picsum.photos/id/0/5616/3744.jpg?hmac=3GAAioiQziMGEtLbfrdbcoenXoWAW-zlyEAMkfEdBzQ",
        price:10000,
        stock: 10
    }
    beforeAll(function(done){
        Product.create(tester)
        .then(function(product){
            prodId = product.id
            return User.findOne({ where: {email: "admin@email.com"} })
        })
        .then(function(admin){
            token = jwtSign({
                id: admin.id,
                email: admin.email,
                role: admin.role
            })
            return User.findOne({ where: {email: "user@email.com"} })
        })
        .then(function(user){
            token2 = jwtSign({
                id: user.id,
                email: user.email,
                role: user.role
            })
            done()
        })
        .catch(function(err){
            done(err)
        })
    })
    afterAll(function(done){
        queryInterface.bulkDelete('Products', {})
        .then(function(){
            done()
        })
        .catch(function(err){
            done(err)
        })
    })
    describe("POST /products", function() {
        const tester1 = {
            name: "laptop",
            image_url: "https://i.picsum.photos/id/0/5616/3744.jpg?hmac=3GAAioiQziMGEtLbfrdbcoenXoWAW-zlyEAMkfEdBzQ",
            price:10000,
            stock: 10
        }
        test("201 Success Create Product - should return json id, name, image_url, price, stock", function(done){
            request(app)
            .post("/products")
            .send(tester1)
            .set("access_token", token)
            .set("Accept", "application/json")
            .then(function(response){
                const {body, status} = response
                expect(status).toBe(201)
                // id = body.id
                expect(body).toHaveProperty("id", expect.any(Number))
                expect(body).toHaveProperty("name", tester1.name)
                expect(body).toHaveProperty("image_url", tester1.image_url)
                expect(body).toHaveProperty("price", tester1.price)
                expect(body).toHaveProperty("stock", tester1.stock)

                done()
            })
            .catch(function(err){
                done(err)
            })
        })
        const tester2 = {
            name: "",
            image_url: "",
            price: null,
            stock: null
        }
        test("400 Failed Create Product fields are empty or null - should return json message", function(done){
            request(app)
            .post("/products")
            .send(tester2)
            .set("access_token", token)
            .set("Accept", "application/json")
            .then(function(response){
                const {body, status} = response
                expect(status).toBe(400)
            
                const expected = ["name cannot be empty!", "image url cannot be empty!", "price cannot be empty!", "stock cannot be empty!"]
                expect(body.errors).toEqual(expect.arrayContaining(expected))
    
                done()
            })
            .catch(function(err){
                done(err)
            })
        })
        const tester3 = {
            name: "",
            image_url: "",
            price: "ll",
            stock: "ll"
        }
        test("400 Failed Create Product price or stock is not a numeric - should return json message", function(done){
            request(app)
            .post("/products")
            .send(tester3)
            .set("access_token", token)
            .set("Accept", "application/json")
            .then(function(response){
                const {body, status} = response
                expect(status).toBe(400)
            
                const expected = ["name cannot be empty!", "image url cannot be empty!", "price must be a number!", "stock must be a number!"]
                expect(body.errors).toEqual(expect.arrayContaining(expected))
    
                done()
            })
            .catch(function(err){
                done(err)
            })
        })
        const tester4 = {
            name: "meja",
            image_url: "https://meja.png",
            price: -10000,
            stock: 10
        }
        test("400 Failed Create Product price is negative - should return json message", function(done){
            request(app)
            .post("/products")
            .send(tester4)
            .set("access_token", token)
            .set("Accept", "application/json")
            .then(function(response){
                const {body, status} = response
                expect(status).toBe(400)
            
                const expected = "Price cannot be a negative value!"
                expect(body.errors).toEqual(expect.stringContaining(expected))
    
                done()
            })
            .catch(function(err){
                done(err)
            })
        })
        const tester5 = {
            name: "meja",
            image_url: "https://meja.png",
            price: 10000,
            stock: 0
        }
        test("400 Failed Create Product stock is less than 1 - should return json message", function(done){
            request(app)
            .post("/products")
            .send(tester5)
            .set("access_token", token)
            .set("Accept", "application/json")
            .then(function(response){
                const {body, status} = response
                expect(status).toBe(400)
            
                const expected = ["Validation min on stock failed"]
                expect(body.errors).toEqual(expect.arrayContaining(expected))
    
                done()
            })
            .catch(function(err){
                done(err)
            })
        })
        test("404 Failed Create Product no access_token - should return json message", function(done){
            request(app)
            .post("/products")
            .send(tester1)
            .set("Accept", "application/json")
            .then(function(response){
                const {body, status} = response
                expect(status).toBe(404)
                expect(body).toHaveProperty("message", "Token is not found!")

                done()
            })
            .catch(function(err){
                done(err)
            })
        })
    })
    describe("GET /products", function() {
        test("200 Success Show all products - should return json data", function(done){
            request(app)
            .get("/products")
            .send()
            .set("access_token", token)
            .set("Accept", "application/json")
            .then(function(response){
                const {body, status} = response
                expect(status).toBe(200)
                expect(body).toEqual(expect.any(Array))

                done()
            })
            .catch(function(err){
                done(err)
            })
        })
        test("404 Failed Show all products no access_token - should return json message", function(done){
            request(app)
            .get("/products")
            .send()
            .set("Accept", "application/json")
            .then(function(response){
                const {body, status} = response
                expect(status).toBe(404)
                expect(body).toHaveProperty("message", "Token is not found!")

                done()
            })
            .catch(function(err){
                done(err)
            })
        })
        test("403 Failed Show all products role not an admin - should return json message", function(done){
            request(app)
            .get("/products")
            .send()
            .set("access_token", token2)
            .set("Accept", "application/json")
            .then(function(response){
                const {body, status} = response
                expect(status).toBe(403)
                expect(body).toHaveProperty("message", "Forbidden Access!")

                done()
            })
            .catch(function(err){
                done(err)
            })
        })
    })
    describe("GET /products/:id", function() {
        test("200 Success get product by id - should return json data", function(done){
            request(app)
            .get(`/products/${prodId}`)
            .send()
            .set("access_token", token)
            .set("Accept", "application/json")
            .then(function(response){
                const {body, status} = response
                expect(status).toBe(200)
                expect(body).toHaveProperty("id", expect.any(Number))
                expect(body).toHaveProperty("name", expect.any(String))

                done()
            })
            .catch(function(err){
                done(err)
            })
        })
        test("404 Failed get product by id Product id is not found - should return json message", function(done){
            request(app)
            .get(`/products/${21}`)
            .send()
            .set("access_token", token)
            .set("Accept", "application/json")
            .then(function(response){
                const {body, status} = response
                expect(status).toBe(404)
                expect(body).toHaveProperty("message", "Product with ID: 21 is not found!")
    
                done()
            })
            .catch(function(err){
                done(err)
            })
        })
        test("404 Failed get product by id no access_token - should return json message", function(done){
            request(app)
            .get(`/products/${prodId}`)
            .send()
            .set("Accept", "application/json")
            .then(function(response){
                const {body, status} = response
                expect(status).toBe(404)
                expect(body).toHaveProperty("message", "Token is not found!")

                done()
            })
            .catch(function(err){
                done(err)
            })
        })
    })
    describe("PUT /products/:id", function() {
        const tester1 = {
            name: "laptop-2",
            image_url: "https://i.picsum.photos/id/0/5616/3744.jpg?hmac=3GAAioiQziMGEtLbfrdbcoenXoWAW-zlyEAMkfEdBzQ",
            price:120000,
            stock: 15
        }
        test("200 Success Update Product - should return json message", function(done){
            request(app)
            .put(`/products/${prodId}`)
            .send(tester1)
            .set("access_token", token)
            .set("Accept", "application/json")
            .then(function(response){
                const {body, status} = response
                expect(status).toBe(200)
                expect(body).toHaveProperty("message", "Succesfully Updated Product!")

                done()
            })
            .catch(function(err){
                done(err)
            })
        })
        const tester2 = {
            name: "",
            image_url: "",
            price: "",
            stock: ""
        }
        test("400 Failed Update Product fields are empty or null - should return json message", function(done){
            request(app)
            .put(`/products/${prodId}`)
            .send(tester2)
            .set("access_token", token)
            .set("Accept", "application/json")
            .then(function(response){
                const {body, status} = response
                expect(status).toBe(400)
            
                const expected = ["name cannot be empty!", "image url cannot be empty!", "price cannot be empty!", "stock cannot be empty!"]
                expect(body.errors).toEqual(expect.arrayContaining(expected))
    
                done()
            })
            .catch(function(err){
                done(err)
            })
        })
        const tester3 = {
            name: "",
            image_url: "",
            price: "ll",
            stock: "ll"
        }
        test("400 Failed Update Product price or stock is not a numeric - should return json message", function(done){
            request(app)
            .put(`/products/${prodId}`)
            .send(tester3)
            .set("access_token", token)
            .set("Accept", "application/json")
            .then(function(response){
                const {body, status} = response
                expect(status).toBe(400)
            
                const expected = ["name cannot be empty!", "image url cannot be empty!", "price must be a number!", "stock must be a number!"]
                expect(body.errors).toEqual(expect.arrayContaining(expected))
    
                done()
            })
            .catch(function(err){
                done(err)
            })
        })
        const tester4 = {
            name: "meja",
            image_url: "https://meja.png",
            price: -10000,
            stock: 10
        }
        test("400 Failed Update Product price is negative - should return json message", function(done){
            request(app)
            .put(`/products/${prodId}`)
            .send(tester4)
            .set("access_token", token)
            .set("Accept", "application/json")
            .then(function(response){
                const {body, status} = response
                expect(status).toBe(400)
            
                const expected = "Price cannot be a negative value!"
                expect(body.errors).toEqual(expect.stringContaining(expected))
    
                done()
            })
            .catch(function(err){
                done(err)
            })
        })
        const tester5 = {
            name: "meja",
            image_url: "https://meja.png",
            price: 10000,
            stock: 0
        }
        test("400 Failed Update Product stock is less than 1 - should return json message", function(done){
            request(app)
            .put(`/products/${prodId}`)
            .send(tester5)
            .set("access_token", token)
            .set("Accept", "application/json")
            .then(function(response){
                const {body, status} = response
                expect(status).toBe(400)
            
                const expected = ["Validation min on stock failed"]
                expect(body.errors).toEqual(expect.arrayContaining(expected))
    
                done()
            })
            .catch(function(err){
                done(err)
            })
        })
        test("404 Failed Update Product id Product is not found - should return json message", function(done){
            request(app)
            .put(`/products/${21}`)
            .send(tester1)
            .set("access_token", token)
            .set("Accept", "application/json")
            .then(function(response){
                const {body, status} = response
                expect(status).toBe(404)
                expect(body).toHaveProperty("message", "Product is not found!")
    
                done()
            })
            .catch(function(err){
                done(err)
            })
        })
        test("404 Failed Update Product no access_token - should return json message", function(done){
            request(app)
            .put(`/products/${prodId}`)
            .send(tester1)
            .set("Accept", "application/json")
            .then(function(response){
                const {body, status} = response
                expect(status).toBe(404)
                expect(body).toHaveProperty("message", "Token is not found!")

                done()
            })
            .catch(function(err){
                done(err)
            })
        })
    })
    describe("DELETE /products/:id", function() {
        test("200 Success Delete Product - should return json message", function(done){
            request(app)
            .delete(`/products/${prodId}`)
            .send()
            .set("access_token", token)
            .set("Accept", "application/json")
            .then(function(response){
                const {body, status} = response
                expect(status).toBe(200)
                expect(body).toHaveProperty("message", "Succesfully Deleted Product!")

                done()
            })
            .catch(function(err){
                done(err)
            })
        })
        test("404 Failed Delete Product, id Product is not found - should return json message", function(done){
            request(app)
            .delete(`/products/${21}`)
            .send()
            .set("access_token", token)
            .set("Accept", "application/json")
            .then(function(response){
                const {body, status} = response
                expect(status).toBe(404)
                expect(body).toHaveProperty("message", "Product with ID: 21 is not found!")
    
                done()
            })
            .catch(function(err){
                done(err)
            })
        })
        test("404 Failed Delete Product no access_token - should return json message", function(done){
            request(app)
            .delete(`/products/${prodId}`)
            .send()
            .set("Accept", "application/json")
            .then(function(response){
                const {body, status} = response
                expect(status).toBe(404)
                expect(body).toHaveProperty("message", "Token is not found!")

                done()
            })
            .catch(function(err){
                done(err)
            })
        })
    })
})
