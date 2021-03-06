jest.mock("node-fetch")

const fetch = require("node-fetch")
const FormData = require("form-data")
const fs = require("fs").promises
const { Response } = jest.requireActual("node-fetch")
const { when } = require("jest-when")

const materielnet = require("../materielnet.adapter")

describe("getOffers", () => {
  beforeAll(async () => {
    when(fetch)
      .calledWith(
        "https://www.materiel.net/recherche/+fcat-426+fv121-19183.html"
      )
      .mockResolvedValue(
        new Response(
          await fs.readFile(
            `${__dirname}/mocks/https-www-materiel-net-recherche-fcat-426-fv121-19183.html`,
            "utf8"
          )
        )
      )
    when(fetch)
      .calledWith(
        "https://www.materiel.net/recherche/+fcat-426+fv121-19184.html"
      )
      .mockResolvedValue(
        new Response(
          await fs.readFile(
            `${__dirname}/mocks/https-www-materiel-net-recherche-fcat-426-fv121-19184.html`,
            "utf8"
          )
        )
      )
    when(fetch)
      .calledWith(
        "https://www.materiel.net/recherche/+fcat-426+fv121-19185.html"
      )
      .mockResolvedValue(
        new Response(
          await fs.readFile(
            `${__dirname}/mocks/https-www-materiel-net-recherche-fcat-426-fv121-19185.html`,
            "utf8"
          )
        )
      )
    when(fetch)
      .calledWith("https://www.materiel.net/product-listing/stock-price/")
      .mockResolvedValue(
        new Response(
          await fs.readFile(
            `${__dirname}/mocks/https-www-materiel-net-product-listing-stock-price.json`,
            "utf8"
          )
        )
      )
  })

  it("retrieves materiel.net offers", async () => {
    const offers = await materielnet.getOffers()
    expect(fetch).toHaveBeenCalledTimes(4)
    expect(fetch).toHaveBeenCalledWith(
      "https://www.materiel.net/recherche/+fcat-426+fv121-19183.html"
    )
    expect(fetch).toHaveBeenCalledWith(
      "https://www.materiel.net/recherche/+fcat-426+fv121-19184.html"
    )
    expect(fetch).toHaveBeenCalledWith(
      "https://www.materiel.net/recherche/+fcat-426+fv121-19185.html"
    )
    expect(fetch).toHaveBeenCalledWith(
      "https://www.materiel.net/product-listing/stock-price/",
      {
        method: "POST",
        headers: { "X-Requested-With": "XMLHttpRequest" },
        body: expect.any(FormData),
      }
    )
    expect(offers).toMatchSnapshot()
  })
})
