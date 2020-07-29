const request = require('supertest')
const app = require('../app.js')


const testUser = {
  email: 'admin1@mail.com',
  password: '12345'
}
describe('User Routes', () => {
  test('POST /login success', (done) => {
    request(app)
      .post('/login')
      .send(testUser)
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
  });

  test('Failed login response, email or password incorrect', (done) => {
    request(app)
      .post('/login')
      .send({
        email: "admin2@mail.com",
        password: "123"
      })
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