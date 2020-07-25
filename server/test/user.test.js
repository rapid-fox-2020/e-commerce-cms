const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { hashPassword } = require("../helpers/bcrypt");
const { queryInterface } = sequelize;
describe("User Router", () => {
  beforeAll(async (done) => {
    try {
      await queryInterface.bulkInsert(
        "Users",
        [
          {
            email: "halo@mail.com",
            password: hashPassword("1111"),
            role: "admin",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            email: "admin@mail.com",
            password: hashPassword("1111"),
            role: "admin",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
      );
      done();
    } catch (err) {
      done(err);
    }
  });
  afterAll(async (done) => {
    try {
      await queryInterface.bulkDelete("Users", {});
      done();
    } catch (err) {
      done(err);
    }
  });
  describe("POST/Login", () => {
    test("200 login success, return json message", async (done) => {
      try {
        const response = await request(app)
          .post("/login")
          .send({ email: "halo@mail.com", password: "1111" });

        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("access_token", expect.any(String));
        done();
      } catch (err) {
        done(err);
      }
    });
    test("404 Login failed empty email, return json message", async (done) => {
      try {
        const response = await request(app)
          .post("/login")
          .send({ email: "", password: "1111" })
          .set("Accept", "application/json");
        const { body, status } = response;
        expect(status).toBe(404);
        expect(body).toHaveProperty("message", "Wrong Email/Password");
        done();
      } catch (err) {
        done(err);
      }
    });
    test("404 Login failed empty password, return json message", async (done) => {
      try {
        const response = await request(app)
          .post("/login")
          .send({ email: "halo@mail.com", password: "" })
          .set("Accept", "application/json");
        const { body, status } = response;
        expect(status).toBe(404);
        expect(body).toHaveProperty("message", "Wrong Email/Password");
        done();
      } catch (err) {
        done(err);
      }
    });
  });
});
