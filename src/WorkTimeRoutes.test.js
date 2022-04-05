const request = require("supertest");
const app = require("./app");

describe("Work Time CRUD", (done) => {
  test(`POST`, async () => {
    const res = await request(app)
      .post(`/work-time`)
      .send({
        start: "19:03",
        end: "06:59",
        user_email: "w.souzatavares@gmail.com",
      });
    expect(res.statusCode).toEqual(200);
  });

  test(`PUT`, async () => {
    const res = await request(app)
      .put(`/work-time`)
      .send({
        old_email: "w.souzatavares@gmail.com",
        new_email: "atualizado@gmail.com",
      });
    expect(res.statusCode).toEqual(200);
  });

  test(`GET`, async () => {
    const res = await request(app)
      .get(`/work-time`);
    expect(res.statusCode).toEqual(200);
  });

  test(`DELETE`, async () => {
    const email = encodeURIComponent("atualizado@gmail.com");
    const res = await request(app)
      .delete(`/work-time/${email}`);
    expect(res.statusCode).toEqual(200);
  });
});
