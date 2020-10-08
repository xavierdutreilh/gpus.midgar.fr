jest.mock("node-fetch")

const fetch = require("node-fetch")
const fs = require("fs").promises
const { Response } = jest.requireActual("node-fetch")

const ldlc = require("../ldlc.adapter")

describe("getOffers", () => {
  beforeAll(async () => {
    fetch.mockResolvedValue(
      new Response(
        await fs.readFile(`${__dirname}/mocks/get-ldlc-offers.html`, "utf8")
      )
    )
  })

  it("retrieves ldlc offers", async () => {
    const offers = await ldlc.getOffers()
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith(
      "https://www.ldlc.com/recherche/+fcat-4684+fv121-19183,19185.html"
    )
    expect(offers).toMatchSnapshot()
  })
})
