const request = require("supertest")

const api = require("../..")

describe("GET /", () => {
  it("retrieves api information", async () => {
    const response = await request(api.callback()).get("/")
    expect(response.status).toBe(200)
    expect(response.body).toEqual({ name: "gpus.midgar.fr", version: "1.0.0" })
  })
})
