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
      role: "admin",
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
    const newProduct = {
      name: "Laptop Asus ROG",
      image_url:
        "https://d2pa5gi5n2e1an.cloudfront.net/global/images/product/laptops/ASUS_ROG_STRIX_Hero_II_/ASUS_ROG_STRIX_Hero_II__L_1.jpg",
      price: 15000000,
      stock: 4,
      category: "elektronik",
    };
    const productErrorNotEmpty = {
      name: "",
      image_url: "",
      price: 15000000,
      stock: 4,
      category: "",
    };

    const productErrorisNumeric = {
      name: "Laptop",
      image_url: "baju.com",
      price: "diskon besar",
      stock: "kosong",
      category: "elektronik",
    };
    const productErrorPriceMoreThanZero = {
      name: "Laptop",
      image_url: "baju.com",
      price: "0",
      stock: 0,
      category: "elektronik",
    };

    test("201 add products success, return json message", async (done) => {
      try {
        const response = await request(app)
          .post("/products")
          .send(newProduct)
          .set("access_token", access_token);

        const { body, status } = response;
        expect(status).toBe(201);

        expect(body).toHaveProperty("message", expect.any(Object));

        done();
      } catch (err) {
        done(err);
      }
    });
    test("400 error add products - name, image_url, cannot empty, return json message", async (done) => {
      try {
        const response = await request(app)
          .post("/products")
          .send(productErrorNotEmpty)
          .set("access_token", access_token);

        const { body, status } = response;
        expect(status).toBe(400);
        const expected = [
          "name cannot empty",
          "image cannot empty",
          "category cannot empty",
        ];
        expect(body).toHaveProperty("message", expected);

        done();
      } catch (err) {
        done(err);
      }
    });
    test("400 error add products - price & stock must be numeric, return json message", async (done) => {
      try {
        const response = await request(app)
          .post("/products")
          .send(productErrorisNumeric)
          .set("access_token", access_token);

        const { body, status } = response;
        expect(status).toBe(400);
        const expected = ["wrong price format", "wrong stock format"];
        expect(body).toHaveProperty("message", expected);

        done();
      } catch (err) {
        done(err);
      }
    });
    test("400 error add products - price & stock must be greater than 0, return json message", async (done) => {
      try {
        const response = await request(app)
          .post("/products")
          .send(productErrorPriceMoreThanZero)
          .set("access_token", access_token);

        const { body, status } = response;
        expect(status).toBe(400);
        const expected = [
          "Price must be greater than 0",
          "stock must be greater than 0",
        ];
        expect(body).toHaveProperty("message", expected);

        done();
      } catch (err) {
        done(err);
      }
    });
  });
  describe("GET/products", () => {
    test("200 read products success, return json message", async (done) => {
      try {
        const response = await request(app)
          .get("/products")
          .set("access_token", access_token);

        const { body, status } = response;
        expect(status).toBe(200);

        expect(body).toHaveProperty("message", expect.any(Array));

        done();
      } catch (err) {
        done(err);
      }
      // test("403 forbidden access, return json message", async (done) => {
      //   // const getId = 3;
      //   try {
      //     const response = await request(app).get("/products");

      //     const { body, status } = response;
      //     expect(status).toBe(403);

      //     expect(body).toHaveProperty("message", "forbidden access");

      //     done();
      //   } catch (err) {
      //     done(err);
      //   }
      // });
    });
  });

  describe("PUT/products/:id", () => {
    const updateProduct = {
      name: "Laptop Asus ROG",
      image_url:
        "https://d2pa5gi5n2e1an.cloudfront.net/global/images/product/laptops/ASUS_ROG_STRIX_Hero_II_/ASUS_ROG_STRIX_Hero_II__L_1.jpg",
      price: 15000,
      stock: 4,
      category: "elektronik",
    };
    const productErrorNotEmpty = {
      name: "",
      image_url: "",
      price: 15000000,
      stock: 4,
      category: "",
    };

    const productErrorisNumeric = {
      name: "Laptop",
      image_url: "baju.com",
      price: "diskon besar",
      stock: "kosong",
      category: "elektronik",
    };
    const productErrorPriceMoreThanZero = {
      name: "Laptop",
      image_url: "baju.com",
      price: "0",
      stock: 0,
      category: "elektronik",
    };

    test("200 update products success, return json message", async (done) => {
      try {
        const response = await request(app)
          .put(`/products/${idProduct}`)
          .set("access_token", access_token)
          .send(updateProduct);

        const { body, status } = response;
        expect(status).toBe(200);

        expect(body).toHaveProperty("message", expect.any(Array));

        done();
      } catch (err) {
        done(err);
      }
    });
    test("400 error update products - name, image_url, cannot empty, return json message", async (done) => {
      try {
        const response = await request(app)
          .put(`/products/${idProduct}`)
          .send(productErrorNotEmpty)
          .set("access_token", access_token);

        const { body, status } = response;
        expect(status).toBe(400);
        const expected = [
          "name cannot empty",
          "image cannot empty",
          "category cannot empty",
        ];
        expect(body).toHaveProperty("message", expected);

        done();
      } catch (err) {
        done(err);
      }
    });
    test("400 error update products - price & stock must be numeric, return json message", async (done) => {
      try {
        const response = await request(app)
          .put(`/products/${idProduct}`)
          .send(productErrorisNumeric)
          .set("access_token", access_token);

        const { body, status } = response;
        expect(status).toBe(400);
        const expected = ["wrong price format", "wrong stock format"];
        expect(body).toHaveProperty("message", expected);

        done();
      } catch (err) {
        done(err);
      }
    });
    test("400 error update products - price & stock must be greater than 0, return json message", async (done) => {
      try {
        const response = await request(app)
          .put(`/products/${idProduct}`)
          .send(productErrorPriceMoreThanZero)
          .set("access_token", access_token);

        const { body, status } = response;
        expect(status).toBe(400);
        const expected = [
          "Price must be greater than 0",
          "stock must be greater than 0",
        ];
        expect(body).toHaveProperty("message", expected);

        done();
      } catch (err) {
        done(err);
      }
    });
    // test("403 forbidden access, return json message", async (done) => {
    //   // const getId = 3;
    //   try {
    //     const response = await request(app).put("/products/:id").send(getId);

    //     const { body, status } = response;
    //     expect(status).toBe(403);

    //     expect(body).toHaveProperty("message", "forbidden access");

    //     done();
    //   } catch (err) {
    //     done(err);
    //   }
    // });
  });
  describe("DELETE/products/:id", () => {
    test("200 delete products success, return json message", async (done) => {
      const getId = 3;
      try {
        const response = await request(app)
          .delete(`/products/${idProduct}`)
          // .send(idProduct)
          .set("access_token", access_token);

        const { body, status } = response;
        expect(status).toBe(200);

        expect(body).toHaveProperty("message", "success delete");

        done();
      } catch (err) {
        done(err);
      }
    });
    // test("403 forbidden access, return json message", async (done) => {
    //   // const getId = 3;
    //   try {
    //     const response = await request(app)
    //       .delete(`/products/${idProduct}`)
    //       .set("access_token", access_token);

    //     const { body, status } = response;
    //     expect(status).toBe(403);

    //     expect(body).toHaveProperty("message", "forbidden access");

    //     done();
    //   } catch (err) {
    //     done(err);
    //   }
    // });
  });
});
