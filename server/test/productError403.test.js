const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const { User, Product } = require("../models");
const { jwtSignIn } = require("../helpers/jsonwebtoken");
let access_token = "";
let idProduct = 0;
beforeAll(async (done) => {
  try {
    await queryInterface.bulkInsert("Products", [
      {
        name: "Laptop Acer",
        image_url:
          "https://d2pa5gi5n2e1an.cloudfront.net/global/images/product/laptops/ASUS_ROG_STRIX_Hero_II_/ASUS_ROG_STRIX_Hero_II__L_1.jpg",
        price: 15000000,
        stock: 4,
        category: "elektronik",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    const newProduct = {
      name: "Laptop Acer",
      image_url:
        "https://d2pa5gi5n2e1an.cloudfront.net/global/images/product/laptops/ASUS_ROG_STRIX_Hero_II_/ASUS_ROG_STRIX_Hero_II__L_1.jpg",
      price: 15000000,
      stock: 4,
      category: "elektronik",
    };

    const resultAddProduct = await Product.create(newProduct);
    idProduct = resultAddProduct.dataValues.id;

    const newUser = {
      email: "hehe@mail.com",
      password: "terserah",
      role: "customer",
    };
    const checkUser = await User.create(newUser);

    const newUserNotAdmin = {
      email: "hehe222@mail.com",
      password: "terserah",
      role: "customer",
    };
    const checkUserNotAdmin = await User.create(newUserNotAdmin);

    const sendToJwt = {
      email: "hehe@mail.com",
      role: "admin",
    };
    const token = jwtSignIn(sendToJwt);

    access_token = token;

    done();
  } catch (err) {
    done(err);
  }
});
describe("Product Router", () => {
  afterAll(async (done) => {
    try {
      await queryInterface.bulkDelete("Products", {});
      await queryInterface.bulkDelete("Users", {});
      done();
    } catch (err) {
      done(err);
    }
  });
  describe("POST/products/", () => {
    test("403 forbidden access, return json message", async (done) => {
      try {
        const response = await request(app)
          .get(`/products/`)
          .set("access_token", access_token);

        const { body, status } = response;
        expect(status).toBe(403);

        expect(body).toHaveProperty("message", "forbidden access");

        done();
      } catch (err) {
        done(err);
      }
    });
  });
  describe("GET/products", () => {
    test("403 forbidden access, return json message", async (done) => {
      try {
        const response = await request(app)
          .get(`/products/`)
          .set("access_token", access_token);

        const { body, status } = response;
        expect(status).toBe(403);

        expect(body).toHaveProperty("message", "forbidden access");

        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe("PUT/products/:id", () => {
    test("403 forbidden access, return json message", async (done) => {
      // const getId = 3;
      try {
        const response = await request(app)
          .put(`/products/${idProduct}`)
          .set("access_token", access_token);

        const { body, status } = response;
        expect(status).toBe(403);

        expect(body).toHaveProperty("message", "forbidden access");

        done();
      } catch (err) {
        done(err);
      }
    });
  });
  describe("DELETE/products/:id", () => {
    test("403 forbidden access, return json message", async (done) => {
      // const getId = 3;
      try {
        const response = await request(app)
          .delete(`/products/${idProduct}`)
          .set("access_token", access_token);

        const { body, status } = response;
        expect(status).toBe(403);

        expect(body).toHaveProperty("message", "forbidden access");

        done();
      } catch (err) {
        done(err);
      }
    });
  });
});
