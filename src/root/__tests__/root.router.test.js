const request = require("supertest")

const api = require("../../api")

describe("GET /", () => {
  it("retrieves api information", async () => {
    const response = await request(api.callback()).get("/")
    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      name: "gpus.midgar.fr",
      version: expect.any(String),
    })
  })
})
