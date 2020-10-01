jest.mock("../offer.crawler")

const { when } = require("jest-when")
const request = require("supertest")

const api = require("../..")
const crawler = require("../offer.crawler")

describe("GET /offers", () => {
  beforeAll(() => {
    when(crawler.getOffers).calledWith("rtx3070").mockResolvedValue([])
    when(crawler.getOffers).calledWith("rtx3080").mockResolvedValue([])
    when(crawler.getOffers)
      .calledWith("rtx3090")
      .mockResolvedValue([
        {
          store: "nvidia",
          name: "NVIDIA GEFORCE RTX 3090",
          status: "upcoming",
        },
      ])
  })

  it("retrieves offers", async () => {
    const response = await request(api.callback()).get("/offers")
    expect(crawler.getOffers).toHaveBeenCalledTimes(3)
    expect(crawler.getOffers).toHaveBeenCalledWith("rtx3070")
    expect(crawler.getOffers).toHaveBeenCalledWith("rtx3080")
    expect(crawler.getOffers).toHaveBeenCalledWith("rtx3090")
    expect(response.status).toBe(200)
    expect(response.body).toEqual([
      {
        store: "nvidia",
        name: "NVIDIA GEFORCE RTX 3090",
        status: "upcoming",
      },
    ])
  })
})
