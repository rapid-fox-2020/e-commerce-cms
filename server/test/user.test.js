const request = require('supertest');
const app = require('../app')

const userTest = {
    email: `admin@mail.com`,
    password: `1234`
}

describe('POST /login', function () {
    it('responds with json', function (done) {
        request(app)
            .post('/login')
            .set('Accept', 'application/json')
            .send(userTest)
            .then(response => {
                const { status, body } = response

                expect(status).toBe(200)
                expect(body).toHaveProperty(`access_token`, expect.any(String))
                console.log('>>>>', body)
                done()
            })
            .catch(err => {
                console.log(err)
                done()
            })
    });
});