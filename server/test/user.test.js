"use strict"

const request = require('supertest')
const app = require('../app.js')
const {sequelize} = require('../models')
const {queryInterface} = sequelize

describe("User Routes", function(){
    
    describe("POST /users/login", function() {
        test("200 Success Login - should return json access_token", function(done){
            request(app)
            .post("/users/login")
            .send({email: "admin@email.com", password: "12345", role:"admin"})
            .set("Accept", "application/json")
            .then(function(response){
                const {body, status} = response
                expect(status).toBe(200)
                expect(body).toHaveProperty("access_token", expect.any(String))
    
                done()
            })
            .catch(function(err){
                done(err)
            })
        })
        test("404 Login Failed Data not Found - should return json message", function(done){
            request(app)
            .post("/users/login")
            .send({email: "", password: "", role:""})
            .set("Accept", "application/json")
            .then(function(response){
                const {body, status} = response
                expect(status).toBe(404)
                expect(body).toHaveProperty("message", "Data not found!")

                done()
            })
            .catch(function(err){
                done(err)
            })
        })
        test("400 Login Failed incorrect email or password - should return json message", function(done){
            request(app)
            .post("/users/login")
            .send({email: "admin@email.com", password: "13456", role:"admin"})
            .set("Accept", "application/json")
            .then(function(response){
                const {body, status} = response
                expect(status).toBe(400)
                expect(body).toHaveProperty("message", "Incorrect Email or Password!")
                // const expected = ["Incorrect Email or Password!"]
                // expect(body.errors).toEqual(expect.arrayContaining(expected))
    
                done()
            })
            .catch(function(err){
                done(err)
            })
        })
    })
})
