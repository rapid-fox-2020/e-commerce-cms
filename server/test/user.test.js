const app = require('../app')
const request = require('supertest')

// TEST ROUTES (POST /login)

describe("POST /login", () => {
   const adminData = {
      email: "admin@mail.com",
      password: "12345",
   }

   // Success Scenario

   it("login status(200)", function (done) {
      request(app)
         .post('/login')
         .send(adminData)
         .then(response => {
            const { body, status } = response

            expect(status).toBe(200)
            // expect(body).toHaveProperty("id", body.id)
            // expect(body).toHaveProperty("email", body.email)
            expect(body).toHaveProperty("access_token", expect.any(String))
            done()
         })
         .catch(err => {
            done(err)
         })
   })

   // Wrong email scenario

   it("send error message Invalid email with login status(400)", function (done) {
      const adminError = {
         email: "emailYangSalah",
         password: "12345"
      }
      request(app)
         .post('/login')
         .send(adminError)
         .then(response => {
            const { body, status } = response

            expect(status).toBe(400)
            expect(body).toHaveProperty("message", "Invalid Email")
            done()
         })
         .catch(err => {
            done(err)
         })
   })

   // Wrong Password scenario

   it("send error message Invalid Password with login status(400)", function (done) {
      const adminError = {
         email: "admin@mail.com",
         password: "passwordYangSalah"
      }
      request(app)
         .post('/login')
         .send(adminError)
         .then(response => {
            const { body, status } = response

            expect(status).toBe(400)
            expect(body).toHaveProperty("message", "Invalid Password")
            done()
         })
         .catch(err => {
            done(err)
         })
   })
})


