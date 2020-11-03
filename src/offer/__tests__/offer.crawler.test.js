jest.mock("../../db")
jest.mock("../adapters/ldlc.adapter")
jest.mock("../adapters/materielnet.adapter")
jest.mock("../adapters/nvidia.adapter")

const crawler = require("../offer.crawler")
const ldlc = require("../adapters/ldlc.adapter")
const materielnet = require("../adapters/materielnet.adapter")
const nvidia = require("../adapters/nvidia.adapter")
const { Offer } = require("../../db")

describe("refresh", () => {
  beforeAll(() => {
    ldlc.getOffers.mockResolvedValue([
      {
        store: "ldlc",
        key: "AR202009090081",
        name: "ASUS GeForce ROG STRIX RTX 3090 O24G GAMING",
        price: "€1,949.95",
        status: "unavailable",
        url: "https://www.ldlc.com/fiche/PB00369849.html",
      },
    ])
    materielnet.getOffers.mockResolvedValue([
      {
        store: "materielnet",
        key: "AR202009090081",
        name: "Asus GeForce RTX 3090 ROG STRIX OC",
        price: "€1,949.95",
        status: "unavailable",
        url: "https://www.materiel.net/produit/202009090081.html",
      },
    ])
    nvidia.getOffers.mockResolvedValue([
      {
        store: "nvidia",
        key: "NVGFT090_FR",
        name: "NVIDIA GEFORCE RTX 3090",
        price: "€1,549.00",
        status: "unavailable",
      },
    ])
  })

  it("refreshes offers", async () => {
    await crawler.refresh()
    expect(ldlc.getOffers).toHaveBeenCalledTimes(1)
    expect(materielnet.getOffers).toHaveBeenCalledTimes(1)
    expect(nvidia.getOffers).toHaveBeenCalledTimes(1)
    expect(Offer.bulkCreate).toHaveBeenCalledTimes(3)
    expect(Offer.bulkCreate).toHaveBeenCalledWith(
      [
        {
          store: "ldlc",
          key: "AR202009090081",
          name: "ASUS GeForce ROG STRIX RTX 3090 O24G GAMING",
          price: "€1,949.95",
          status: "unavailable",
          url: "https://www.ldlc.com/fiche/PB00369849.html",
        },
      ],
      {
        updateOnDuplicate: ["name", "price", "status", "url", "updatedAt"],
        returning: false,
      }
    )
    expect(Offer.bulkCreate).toHaveBeenCalledWith(
      [
        {
          store: "materielnet",
          key: "AR202009090081",
          name: "Asus GeForce RTX 3090 ROG STRIX OC",
          price: "€1,949.95",
          status: "unavailable",
          url: "https://www.materiel.net/produit/202009090081.html",
        },
      ],
      {
        updateOnDuplicate: ["name", "price", "status", "url", "updatedAt"],
        returning: false,
      }
    )
    expect(Offer.bulkCreate).toHaveBeenCalledWith(
      [
        {
          store: "nvidia",
          key: "NVGFT090_FR",
          name: "NVIDIA GEFORCE RTX 3090",
          price: "€1,549.00",
          status: "unavailable",
        },
      ],
      {
        updateOnDuplicate: ["name", "price", "status", "url", "updatedAt"],
        returning: false,
      }
    )
  })
})
