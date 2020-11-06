jest.mock("node-fetch")

const fetch = require("node-fetch")
const fs = require("fs").promises
const { Response } = jest.requireActual("node-fetch")
const { when } = require("jest-when")

const ldlc = require("../ldlc.adapter")

describe("getOffers", () => {
  beforeAll(async () => {
    when(fetch)
      .calledWith("https://www.ldlc.com/recherche/+fcat-4684+fv121-19183.html")
      .mockResolvedValue(
        new Response(
          await fs.readFile(
            `${__dirname}/mocks/https-www-ldlc-com-recherche-fcat-4684-fv121-19183.html`,
            "utf8"
          )
        )
      )
    when(fetch)
      .calledWith("https://www.ldlc.com/recherche/+fcat-4684+fv121-19184.html")
      .mockResolvedValue(
        new Response(
          await fs.readFile(
            `${__dirname}/mocks/https-www-ldlc-com-recherche-fcat-4684-fv121-19184.html`,
            "utf8"
          )
        )
      )
    when(fetch)
      .calledWith("https://www.ldlc.com/recherche/+fcat-4684+fv121-19185.html")
      .mockResolvedValue(
        new Response(
          await fs.readFile(
            `${__dirname}/mocks/https-www-ldlc-com-recherche-fcat-4684-fv121-19185.html`,
            "utf8"
          )
        )
      )
  })

  it("retrieves ldlc offers", async () => {
    const offers = await ldlc.getOffers()
    expect(fetch).toHaveBeenCalledTimes(3)
    expect(fetch).toHaveBeenCalledWith(
      "https://www.ldlc.com/recherche/+fcat-4684+fv121-19183.html"
    )
    expect(fetch).toHaveBeenCalledWith(
      "https://www.ldlc.com/recherche/+fcat-4684+fv121-19184.html"
    )
    expect(fetch).toHaveBeenCalledWith(
      "https://www.ldlc.com/recherche/+fcat-4684+fv121-19185.html"
    )
    expect(offers).toMatchSnapshot()
  })
})
