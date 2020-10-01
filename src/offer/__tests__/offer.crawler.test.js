jest.mock("../adapters")

const crawler = require("../offer.crawler")
const adapters = require("../adapters")

describe("getOffers", () => {
  beforeAll(() => {
    adapters.ldlc.getOffers.mockResolvedValue([
      {
        store: "ldlc",
        name: "ASUS GeForce ROG STRIX RTX 3090 O24G GAMING",
        status: "Rupture",
      },
    ])
    adapters.nvidia.getOffers.mockResolvedValue([
      {
        store: "nvidia",
        name: "NVIDIA GEFORCE RTX 3090",
        status: "upcoming",
      },
    ])
  })

  it("retrieves offers", async () => {
    const offers = await crawler.getOffers("rtx3090")
    expect(adapters.ldlc.getOffers).toHaveBeenCalledTimes(1)
    expect(adapters.ldlc.getOffers).toHaveBeenCalledWith("rtx3090")
    expect(adapters.nvidia.getOffers).toHaveBeenCalledTimes(1)
    expect(adapters.nvidia.getOffers).toHaveBeenCalledWith("rtx3090")
    expect(offers).toEqual([
      {
        store: "ldlc",
        name: "ASUS GeForce ROG STRIX RTX 3090 O24G GAMING",
        status: "Rupture",
      },
      {
        store: "nvidia",
        name: "NVIDIA GEFORCE RTX 3090",
        status: "upcoming",
      },
    ])
  })
})
