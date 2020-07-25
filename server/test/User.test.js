const request = require('supertest');
const app = require('../app');

const userTest = {
    email: 'admin@mail.com',
    password: 'test',
}

describe('POST /login', function() {
    it('responds success login', function(done) {
        request(app)
            .post('/login')
            .send(userTest)
            .set('Accept', 'application/json')
            // .expect('Content-Type', /json/)
            .then((result) => {
                const { status, body } = result
                expect(status).toBe(200)
                expect(body).toHaveProperty('access_token', expect.any(String));
                done();
            }).catch((err) => {
                done(err);
            });
    });

    it('responds failed login -wrong password and email', function(done) {
        request(app)
            .post('/login')
            .send({
                email: 'admina@mail.com',
                password: "1234"
            })
            .set('Accept', 'application/json')
            // .expect('Content-Type', /json/)
            .then((result) => {
                const { status, body } = result
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', "invalid username and password");
                done();
            }).catch((err) => {
                done(err);
            });
    });
});