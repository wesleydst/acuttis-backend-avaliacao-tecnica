const request = require("supertest");
const app = require("./app");

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

  test(`Deve retornar erro ao informar tempos iguais`, async () => {
    const startEncoded = encodeURI("00:00");
    const endEncoded = encodeURI("00:00");
    const res = await request(app)
      .get(`/time-calculator/calculate/${startEncoded}/${endEncoded}`);
    expect(res.statusCode).toEqual(500);
    expect(res.body).toEqual({
      error: "Tempos iguais não é válido."
    });
  });
});

test(`Retornar 404 para uma rota inexistente`, async () => {
  const res = await request(app)
    .get('/rota-inexistente');
  expect(res.statusCode).toEqual(404);
});