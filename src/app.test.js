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

describe("Time Calculator Endpoint", () => {
  test(`De 19:03 às 06:59 retorna 296min diurnos e 420min noturnos`, async () => {
    const startEncoded = encodeURI("19:03");
    const endEncoded = encodeURI("06:59");
    const res = await request(app)
      .get(`/time-calculator/calculate/${startEncoded}/${endEncoded}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      daytimeInMinutes: 296,
      nocturnalInMinutes: 420
    });
  });
});