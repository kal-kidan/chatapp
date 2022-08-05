const request = require("supertest");
const mongoose = require("mongoose");
const config = require("./../config/config");
const app = require("./../server");
describe("USER", () => {
  beforeEach((done) => {
    mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
      done();
    });
  });

  afterEach((done) => {
    mongoose.connection.close(() => done());
  });
  it("shouldn't sign in user", async () => {
    await request(app)
      .post("/v1/auth/login")
      .send({
        email: "kal@gmail.com",
        password: "pw",
      })
      .expect(401)
      .then((res) => {})
      .catch((err) => {
        expect(err).toEqual(
          expect.objectContaining({
            code: 401,
            message: "Incorrect email or password",
          })
        );
      });
  });

  it("should sign in user", async () => {
    await request(app)
      .post("/v1/auth/login")
      .send({
        email: "test@gmail.com",
        password: "password123",
      })
      .expect("Content-Type", "html")
      .expect(200)
      .then((res) => {
        expect(res.h).toStrictEqual({
          role: "user",
          email: "test@gmail.com",
          name: "test user",
        });
      })
      .catch((err) => {});
  });
  //   it("should return home page", () => {
  //     request(app)
  //       .get(url + "/v1")
  //       .expect(200)
  //       .then(() => {})
  //       .catch.catch((err) => {});
  //   });
});
