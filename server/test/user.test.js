const request = require('supertest')
const server = require('../server.js')
const { User, sequelize } = require('../models')
const {queryInterface} = sequelize


afterAll((done) => {
    return queryInterface.bulkDelete("Users",null, {})
    .then(data => {
        done()
    })
    .catch(err => {
        done (err)
    })
})
beforeAll(async (done) => {
    const userCreate = {
        email: "user@admin.com",
        password: '1234',
        role: "admin"
    }
    User.create(userCreate)
        .then(newUser => {
            // access_token = newUser
            done()
        })
        .catch(err => {
            done (err)
        }) 
})

const access_token = ""
describe('User Routes', () => {

    describe("POST /login", () => {
        test("200 Login Succes - should return json message", (done) => {
            const userLogin = {
                email: "user@admin.com",
                password: '1234',
            }
            return request(server)
                    .post('/login')
                    .send(userLogin)
                    .set("Accept", "application/json")
                    .then(response => {
                        const { body, status } = response
                        expect(status).toBe(200)
                        expect(body).toHaveProperty("access_token")
                        done()
                    })
                    .catch((err) => {
                        done (err)
                    })
        })
        test("404 login failed empty email - should return json message", (done) => {
            const userLoginError = {
                email: "",
                password: '1234',
            }
            return request(server)
                    .post('/login')
                    .send(userLoginError)
                    .set("Accept", "application/json")
                    .then(response => {
                        const { body, status } = response
                        expect(status).toBe(404)
                        expect(body).toHaveProperty("message", "email cannot be empty")
                        done()
                    })
                    .catch((err) => {
                        done (err)
                    })
        })
        test("404 login failed empty password - should return json message", (done) => {
            const userLoginError = {
                email: "user@admin.com",
                password: '',
            }
            return request(server)
                    .post('/login')
                    .send(userLoginError)
                    .set("Accept", "application/json")
                    .then(response => {
                        const { body, status } = response
                        expect(status).toBe(404)
                        expect(body).toHaveProperty("message", "password cannot be empty")
                        done()
                    })
                    .catch((err) => {
                        done (err)
                    })
        })
        // test("400 login failed invalid format email - should return json message")
    })
})
