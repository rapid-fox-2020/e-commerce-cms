const app = require("../app");
const request = require('supertest');
const { User, sequelize } = require('../models');
const jwt = require('jsonwebtoken');
const { queryInterface, Sequelize } = sequelize;


let userToken = '';
const userData = {
  email: 'admin@email.com',
}

beforeAll(done => {
  User.findOne({where: {email: userData.email}})
  .then(user => {
    userToken = jwt.sign({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }, process.env.SECRET );
    done();
  })
  .catch(err => {
    console.log(err);
    done(err);
  })
})

afterAll(async (done) => {
  try {
    await queryInterface.dropTable('Products');
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      image_url: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.DOUBLE
      },
      stock: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    done();
  } catch (e) {
    done(e);
  }
})

// TEST RESPONSE OK

describe('POST /products', function() {
  it('Create Product', function(done) {
    request(app)
      .post('/products')
      .set('access_token', userToken)
      .set('Accept', 'application/json')
      .send({
        name: 'Buku',
        image_url: 'http://buku.com',
        price: 12000,
        stock: 10
      })
      .then((response) => {
        const { status, body } = response;
        expect(status).toBe(201);
        expect(body).toHaveProperty('name', 'Buku');
        done();
      })
      .catch(err => {
        console.log(err);
        done(err);
      })
  });
});

describe('GET /products', function() {
  it('Get All Products', function(done) {
    request(app)
      .get('/products')
      .set('access_token', userToken)
      .set('Accept', 'application/json')
      .then((response) => {
        const { status, body } = response;
        expect(status).toBe(200);
        expect(Array.isArray(body)).toBeTruthy();
        done();
      })
      .catch(err => {
        console.log(err);
        done(err);
      })
  });
});

describe('GET /products/:id', function() {
  it('Get One Product', function(done) {
    request(app)
      .get('/products/1')
      .set('access_token', userToken)
      .set('Accept', 'application/json')
      .then((response) => {
        const { status, body } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty('name', expect.any(String));
        done();
      })
      .catch(err => {
        console.log(err);
        done(err);
      })
  });
});

describe('PATCH /products/:id', function() {
  it('Update Product', function(done) {
    const nameTest = 'Hello';
    request(app)
      .patch('/products/10')
      .set('access_token', userToken)
      .set('Accept', 'application/json')
      .send({
        name: nameTest,
        image_url: 'http://buku.com',
        price: 12000,
        stock: 10
      })
      .then((response) => {
        const { status, body } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty('name', `${nameTest}`);
        done();
      })
      .catch(err => {
        console.log(err);
        done(err);
      })
  });
});

describe('DELETE /products/:id', function() {
  it('Delete Product', function(done) {
    const idTest = 1;
    request(app)
      .delete(`/products/${idTest}`)
      .set('access_token', userToken)
      .set('Accept', 'application/json')
      .then((response) => {
        const { status, body } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty('id', idTest);
        done();
      })
      .catch(err => {
        console.log(err);
        done(err);
      })
  });
});





// TEST RESPONSE ERROR

describe('POST /products', function() {
  it(`Create Product with an Empty "name"`, function(done) {
    const dataTest = {
      name: '',
      image_url: 'http://buku.com',
      price: 12000,
      stock: 10
    }
    request(app)
      .post('/products')
      .set('access_token', userToken)
      .set('Accept', 'application/json')
      .send(dataTest)
    .then((response) => {
      const { status, body } = response;
      expect(status).toBe(400);
      expect(body).toBe('name cannot be empty');
      done();
    })
    .catch(err => {
      console.log(err);
      done(err);
    })
  });
});

describe('POST /products', function() {
  it(`Create Product with wrong "image_url" format`, function(done) {
    const dataTest = {
      name: 'Book',
      image_url: 'BookURL',
      price: 12000,
      stock: 10
    }
    request(app)
      .post('/products')
      .set('access_token', userToken)
      .set('Accept', 'application/json')
      .send(dataTest)
    .then((response) => {
      const { status, body } = response;
      expect(status).toBe(400);
      expect(body).toBe('incorrect format for image url');
      done();
    })
    .catch(err => {
      console.log(err);
      done(err);
    })
  });
});

describe('POST /products', function() {
  it(`Create Product with negative "price" value`, function(done) {
    const dataTest = {
      name: 'Book',
      image_url: 'http://buku.com',
      price: -10,
      stock: 10
    }
    request(app)
      .post('/products')
      .set('access_token', userToken)
      .set('Accept', 'application/json')
      .send(dataTest)
    .then((response) => {
      const { status, body } = response;
      expect(status).toBe(400);
      expect(body).toBe('price must be equal or greater than 0');
      done();
    })
    .catch(err => {
      console.log(err);
      done(err);
    })
  });
});

describe('POST /products', function() {
  it(`Create Product with negative "stock" value`, function(done) {
    const dataTest = {
      name: 'Book',
      image_url: 'http://buku.com',
      price: 12000,
      stock: -10
    }
    request(app)
      .post('/products')
      .set('access_token', userToken)
      .set('Accept', 'application/json')
      .send(dataTest)
    .then((response) => {
      const { status, body } = response;
      expect(status).toBe(400);
      expect(body).toBe('stock must be equal or greater than 0');
      done();
    })
    .catch(err => {
      console.log(err);
      done(err);
    })
  });
});

describe('GET /products/:id', function() {
  it('Get One Product without "access_token"', function(done) {
    request(app)
      .get('/products/1')
      // .set('access_token', userToken)
      .set('Accept', 'application/json')
      .then((response) => {
        const { status, body } = response;
        expect(status).toBe(400);
        expect(body).toBe('token needed');
        done();
      })
      .catch(err => {
        console.log(err);
        done(err);
      })
  });
});

describe('PATCH /products/:id', function() {
  it(`Update Product with an Empty "name"`, function(done) {
    const dataTest = {
      name: '',
      image_url: 'http://buku.com',
      price: 12000,
      stock: 10
    }
    request(app)
      .patch('/products/1')
      .set('access_token', userToken)
      .set('Accept', 'application/json')
      .send(dataTest)
    .then((response) => {
      const { status, body } = response;
      expect(status).toBe(400);
      expect(body).toBe('name cannot be empty');
      done();
    })
    .catch(err => {
      console.log(err);
      done(err);
    })
  });
});

describe('PATCH /products/:id', function() {
  it(`Update Product with wrong "image_url" format`, function(done) {
    const dataTest = {
      name: 'Book',
      image_url: 'BookURL',
      price: 12000,
      stock: 10
    }
    request(app)
      .patch('/products/1')
      .set('access_token', userToken)
      .set('Accept', 'application/json')
      .send(dataTest)
    .then((response) => {
      const { status, body } = response;
      expect(status).toBe(400);
      expect(body).toBe('incorrect format for image url');
      done();
    })
    .catch(err => {
      console.log(err);
      done(err);
    })
  });
});

describe('PATCH /products/:id', function() {
  it(`Update Product with negative "price" value`, function(done) {
    const dataTest = {
      name: 'Book',
      image_url: 'http://buku.com',
      price: -10,
      stock: 10
    }
    request(app)
      .patch('/products/1')
      .set('access_token', userToken)
      .set('Accept', 'application/json')
      .send(dataTest)
    .then((response) => {
      const { status, body } = response;
      expect(status).toBe(400);
      expect(body).toBe('price must be equal or greater than 0');
      done();
    })
    .catch(err => {
      console.log(err);
      done(err);
    })
  });
});

describe('PATCH /products/:id', function() {
  it(`Update Product with negative "stock" value`, function(done) {
    const dataTest = {
      name: 'Book',
      image_url: 'http://buku.com',
      price: 12000,
      stock: -10
    }
    request(app)
      .patch('/products/1')
      .set('access_token', userToken)
      .set('Accept', 'application/json')
      .send(dataTest)
    .then((response) => {
      const { status, body } = response;
      expect(status).toBe(400);
      expect(body).toBe('stock must be equal or greater than 0');
      done();
    })
    .catch(err => {
      console.log(err);
      done(err);
    })
  });
});

describe('DELETE /products/:id', function() {
  it('Delete Product without "access_token"', function(done) {
    const idTest = 1;
    request(app)
      .delete(`/products/${idTest}`)
      // .set('access_token', userToken)
      .set('Accept', 'application/json')
      .then((response) => {
        const { status, body } = response;
        expect(status).toBe(400);
        expect(body).toBe('token needed');
        done();
      })
      .catch(err => {
        console.log(err);
        done(err);
      })
  });
});