const request = require("supertest");
const app = require("./app");

describe("Root Endpoint", () => {
  test(`Retornar JSON: { message: "Hello Universe!" }`, async () => {
    const res = await request(app)
      .get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ message: "Hello Universe!" });
  });
});