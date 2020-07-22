const request = require('supertest')

beforeAll ((done) => {
    let input = {
        email: "admin@mail.com",
        password: "12345",
        role: "admin"
    }
    User.create(input)
    .then((user) => {
        access_token = encode({
            id: user.id,
            email: user.email
        })
    }).catch((err) => {
        done(err)
    });
})

let correctUser = {
    email: "admin@mail.com",
    password: "12345",
}

let incorrectUser = {
    email: "admin2@mail.com",
    password: "24234",
}

describe('POST /login', () => {

    test('(200) success login', (done) => {
        request(app)
            .post('/login')
            .send(correctUser)
            .set('Accept', 'application/json')
            .then((response) => {
                const { status, body } = response
                expect(status).toBe(200)
                expect(body).toHaveProperty('access_token', expect.any(String))
                done()
            })
            .catch((err) => {
                done(err)
            })
    })

    test('(400) Failed login response, email or password incorrect', (done) => {
        request(app)
            .post('/login')
            .send(incorrectUser)
            .set('Accept', 'application/json')
            .then((response) => {
                const { status, body } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', 'email or password incorrect')
                done()
            })
            .catch((err) => {
                done(err)
            })
    });

})
  