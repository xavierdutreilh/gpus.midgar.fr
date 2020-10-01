jest.mock("node-fetch")

const fetch = require("node-fetch")
const fs = require("fs").promises
const { Response } = jest.requireActual("node-fetch")

const nvidia = require("../nvidia.adapter")

describe("getOffers", () => {
  beforeAll(async () => {
    fetch.mockResolvedValue(
      new Response(
        await fs.readFile(`${__dirname}/mocks/get-nvidia-products.json`, "utf8")
      )
    )
  })

  it("retrieves nvidia offers", async () => {
    const products = await nvidia.getOffers("rtx3090")
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith(
      "https://api.nvidia.partners/edge/product/search?page=1&limit=100&locale=fr-fr&gpu=RTX%203090&category=GPU"
    )
    expect(products).toMatchSnapshot()
  })
})
