const request = require('supertest')
const app = require('../app');
const { response } = require('../app');

const userTest = {
    email: "admin@email.com",
    password: "admin"
}

describe('POST /login', function() {
    it('responds with json', function(done) {
      request(app)
        .post('/login')
        .set('Accept', 'application/json')
        .send(userTest)
        .then(response => {
          const { status, body} = response

          expect(status).toBe(200)
          expect(body).toHaveProperty('token', expect.any(String))
          console.log(body,"<<<<< INI BODY")
          done()
        })
        .catch(err =>{
          console.log(err)
          done()
        })
    });
  });