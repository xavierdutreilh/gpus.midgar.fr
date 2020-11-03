const request = require("supertest")

const api = require("../api")

describe("GET /", () => {
  describe("Accept: text/html", () => {
    it("redirects to /offers", async () => {
      const response = await request(api.callback())
        .get("/")
        .set("Accept", "text/html")
      expect(response.status).toBe(302)
      expect(response.headers.location).toEqual("/offers")
      expect(response.text).toMatchSnapshot()
    })
  })

  describe("Accept: application/json", () => {
    it("retrieves system information", async () => {
      const response = await request(api.callback())
        .get("/")
        .set("Accept", "application/json")
      expect(response.status).toBe(200)
      expect(response.body).toEqual({
        name: "gpus.midgar.fr",
        version: expect.any(String),
        environment: "test",
      })
    })
  })
})

describe("GET /offers", () => {
  describe("Accept: text/html", () => {
    it("renders offers", async () => {
      const response = await request(api.callback())
        .get("/offers")
        .set("Accept", "text/html")
      expect(response.status).toBe(200)
      expect(response.text).toMatchSnapshot()
    })
  })

  describe("Accept: application/json", () => {
    it("retrieves offers", async () => {
      const response = await request(api.callback())
        .get("/offers")
        .set("Accept", "application/json")
      expect(response.status).toBe(200)
      expect(response.body).toEqual([
        {
          store: "nvidia",
          name: "NVIDIA GEFORCE RTX 3090",
          price: "€1,549.00",
          status: "unavailable",
          url: null,
        },
        {
          store: "ldlc",
          name: "ASUS GeForce ROG STRIX RTX 3090 O24G GAMING",
          price: "€1,949.95",
          status: "unavailable",
          url: "https://www.ldlc.com/fiche/PB00369849.html",
        },
      ])
    })
  })
})
