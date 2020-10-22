const request = require("supertest")

const api = require("../api")
const { Offer } = require("../db")

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

describe("GET /offers", () => {
  beforeAll(() =>
    Offer.create({
      store: "nvidia",
      key: "NVGFT090_FR",
      name: "NVIDIA GEFORCE RTX 3090",
      price: "€1,549.00",
      status: "unavailable",
    })
  )

  afterAll(() => Offer.truncate({ cascade: true, restartIdentity: true }))

  it("retrieves offers", async () => {
    const response = await request(api.callback()).get("/offers")
    expect(response.status).toBe(200)
    expect(response.body).toEqual([
      {
        store: "nvidia",
        key: "NVGFT090_FR",
        name: "NVIDIA GEFORCE RTX 3090",
        price: "€1,549.00",
        status: "unavailable",
        url: null,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      },
    ])
  })
})
