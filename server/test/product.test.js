const app = require('../app')
const request = require('supertest')
const { User, Product } = require('../models')
const { encode } = require('../helpers/jwt')
const { sequelize } = require('../models')
const { queryInterface } = sequelize

describe("CRUD /products", () => {
   let access_token;
   let wrong_token;
   let wrongId = 123123123

   // Variable user global

   let userGlobal = {
      email: "admin@mail.com",
      password: "12345",
      role: "admin"
   }

   // Variable user not Admin global

   let notAdmin = {
      email: "notAdmin@mail.com",
      password: "12345",
      role: "staff"
   }

   // Variable product global

   let productGlobal = {
      id: null,
      name: "namaProduct",
      imageUrl: "https://ecs7.tokopedia.net/img/cache/700/product-1/2018/6/21/3029860/3029860_bba695f5-bf14-4f11-bfef-63be5afe7b05_700_700.jpg",
      stock: 20,
      price: 10000
   }

   // Variable wrong global

   let wrongProductGlobal = {
      name: "",
      imageUrl: "",
      price: "",
      stock: ""
   }

   // Variable global update

   let invalidUpdatedProduct = {
      name: "nama-has-been-updated",
      imageUrl: "image-has-been-updated",
      price: "price-has-been-updated",
      stock: "stock-has-been-updated"
   }

   let updatedProduct = {
      name: "updatedProductName",
      imageUrl: "updatedProductImageUrl.com",
      stock: 200,
      price: 200
   }

   beforeAll((done) => {
      User.create(userGlobal)
         .then(data => {
            access_token = encode(data)
            return User.create(notAdmin)
         })
         .then((wrongData) => {
            wrong_token = encode(wrongData)
            done()
         })
         .catch(err => {
            done(err)
         })
   });

   afterAll((done) => {
      queryInterface.bulkDelete('Products', {})
         .then(() => {
            return queryInterface.bulkDelete('Users', {})
            // done()
         })
         .then(() => {
            done()
         })
         .catch(err => {
            done(err)
         })
   })

   // Create New Product

   describe("POST /products", () => {
      // Success Scenario

      it("create products response (201)", (done) => {
         request(app)
            .post('/products')
            .send(productGlobal)
            .set("access_token", access_token)
            .then(response => {
               const { body, status } = response

               productGlobal.id = body.id

               expect(status).toBe(201)
               expect(body).toHaveProperty("id", expect.any(Number))
               expect(body).toHaveProperty("name", productGlobal.name)
               expect(body).toHaveProperty("imageUrl", productGlobal.imageUrl)
               expect(body).toHaveProperty("price", productGlobal.price)
               expect(body).toHaveProperty("stock", productGlobal.stock)
               done()
            })
            .catch(err => {
               done(err)
            })
      })

      // Authorization Error Scenario

      it("Error authorization (403)", (done) => {
         request(app)
            .post('/products')
            .send(productGlobal)
            .set("access_token", wrong_token)
            .then(response => {
               const { body, status } = response
               expect(status).toBe(403)
               expect(body).toHaveProperty("message", 'Forbidden Access')
               done()
            })
            .catch(err => {
               done(err)
            })
      })

      // Empty Field Error Scenario

      it("EMPTY FIELD SCENARIO (400)", (done) => {
         request(app)
            .post('/products')
            .send(wrongProductGlobal)
            .set("access_token", access_token)
            .then(response => {
               const { body, status } = response
               console.log(body);

               expect(status).toBe(400)
               expect(body).toHaveProperty("message", expect.any(Array))
               done()
            })
            .catch(err => {
               done(err)
            })
      })

   })

   // Show All Products

   describe("GET /products", () => {

      // Success Scenario

      it("create products response (200)", (done) => {
         request(app)
            .get('/products')
            .set("access_token", access_token)
            .then(response => {
               const { body, status } = response

               expect(status).toBe(200)
               expect(body).toEqual(expect.any(Array))
               done()
            })
            .catch(err => {
               done(err)
            })
      })

      // Authentication Error Scenario

      it("authentication error response (401)", (done) => {
         request(app)
            .get('/products')
            .set('access_token', "invalid access token")
            .then(response => {
               const { body, status } = response
               expect(status).toBe(401)
               expect(body).toHaveProperty('message', "Token is invalid")
               done()
            })
            .catch(err => {
               done(err)
            })
      })

      // Authorization Error Scenario

      it("authorization error response (403)", (done) => {
         request(app)
            .get('/products')
            .set("access_token", wrong_token)
            .then(response => {
               const { body, status } = response

               expect(status).toBe(403)
               expect(body).toHaveProperty("message", 'Forbidden Access')
               done()
            })
            .catch(err => {
               done(err)
            })
      })

   })

   // Show Products by its Id

   describe("GET /products/:id", () => {

      // Success Scenario

      it("get products by id response (200)", (done) => {
         request(app)
            .get(`/products/${productGlobal.id}`)
            .set("access_token", access_token)
            .then(response => {
               const { body, status } = response
               expect(status).toBe(200)
               expect(body).toHaveProperty("id", productGlobal.id)
               expect(body).toHaveProperty("name", productGlobal.name)
               expect(body).toHaveProperty("imageUrl", expect.any(String))
               expect(body).toHaveProperty("price", productGlobal.price)
               expect(body).toHaveProperty("stock", productGlobal.stock)
               expect(body).toHaveProperty("createdAt", expect.any(String))
               expect(body).toHaveProperty("updatedAt", expect.any(String))
               done()
            })
            .catch(err => {
               done(err)
            })
      })

      //  Error Authorization

      it("authorization errors by id response (403)", (done) => {
         request(app)
            .get(`/products/${productGlobal.id}`)
            .set("access_token", wrong_token)
            .then(response => {
               const { body, status } = response

               expect(status).toBe(403)
               expect(body).toHaveProperty("message", 'Forbidden Access')
               done()
            })
            .catch(err => {
               done(err)
            })
      })

      // Error Data Not Found
      it("data not found by id response (404)", (done) => {
         request(app)
            .get(`/products/0`)
            .set("access_token", access_token)
            .then(response => {
               const { body, status } = response

               expect(status).toBe(404)
               expect(body).toHaveProperty("message", 'Data not found')
               done()
            })
            .catch(err => {
               done(err)
            })
      })
   })

   // Update Products by its Id

   describe("PUT /products/:id", () => {

      // Success Scenario

      it("update products by id response (200)", (done) => {
         console.log("<<<<<<< INI MASUK GA DI PUT");
         request(app)
            .put(`/products/${productGlobal.id}`)
            .send(updatedProduct)
            .set("access_token", access_token)
            .then(response => {
               const { body, status } = response
               expect(status).toBe(200)
               expect(body).toHaveProperty("message", "successfully updated")
               done()
            })
            .catch(err => {
               done(err)
            })
      })

      //  Error Authorization

      it("update authorization error by id response (403)", (done) => {
         request(app)
            .put(`/products/${productGlobal.id}`)
            .set("access_token", wrong_token)
            .send(updatedProduct)
            .then(response => {
               const { body, status } = response

               expect(status).toBe(403)
               expect(body).toHaveProperty("message", 'Forbidden Access')
               done()
            })
            .catch(err => {
               done(err)
            })
      })

      // Error Invalid Input

      it("update data not found by id response (400)", (done) => {

         request(app)
            .put(`/products/${wrongId}`)
            .set("access_token", access_token)
            .send(invalidUpdatedProduct)
            .then(response => {
               const { body, status } = response

               expect(status).toBe(400)
               expect(body).toHaveProperty("message", expect.any(Array))
               done()
            })
            .catch(err => {
               done(err)
            })
      })

   })

   // Delete Products by its Id

   describe("DELETE /products/:id", () => {

      // Success Scenario

      it("delete products by id response (200)", (done) => {
         request(app)
            .delete(`/products/${productGlobal.id}`)
            .set("access_token", access_token)
            .then(response => {
               const { body, status } = response
               expect(status).toBe(200)
               expect(body).toHaveProperty("message", 'successfully deleted')
               done()
            })
            .catch(err => {
               done(err)
            })
      })

      //  Error Authorization

      it(" delete authorization errors by id response (403)", (done) => {
         request(app)
            .delete(`/products/${productGlobal.id}`)
            .set("access_token", wrong_token)
            .then(response => {
               const { body, status } = response

               expect(status).toBe(403)
               expect(body).toHaveProperty("message", 'Forbidden Access')
               done()
            })
            .catch(err => {
               done(err)
            })
      })

      // Error Data Not Found

      it("data not found by id response (404)", (done) => {
         request(app)
            .delete(`/products/1`)
            .set("access_token", access_token)
            .then(response => {
               const { body, status } = response

               expect(status).toBe(404)
               expect(body).toHaveProperty("message", 'Data not found')
               done()
            })
            .catch(err => {
               done(err)
            })
      })
   })

})