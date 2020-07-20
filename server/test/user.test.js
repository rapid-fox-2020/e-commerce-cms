const app = require("../app");
const request = require('supertest');

const adminData = {
  email: 'admin@email.com',
  password: '1234',
}

const BukanAdminData = {
  email: 'bukanAdmin@email.com',
  password: '1234',
}

describe('POST /login', function() {
  it('Login User with role "admin"', function(done) {
    request(app)
      .post('/login')
      .set('Accept', 'application/json')
      .send(adminData)
      .expect('Content-Type', /json/)
      .then((response) => {
        const { status, body } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty('access_token', expect.any(String));
        done();
      })
  });
});

describe('POST /login', function() {
  it('Login User with role "admin"', function(done) {
    request(app)
      .post('/login')
      .set('Accept', 'application/json')
      .send(BukanAdminData)
      .expect('Content-Type', /json/)
      .then((response) => {
        const { status, body } = response;
        expect(status).toBe(401);
        expect(body).toBe('Admin Only');
        done();
      })
  });
});