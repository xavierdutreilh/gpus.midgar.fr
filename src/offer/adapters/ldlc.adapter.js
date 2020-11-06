const cheerio = require("cheerio")
const fetch = require("node-fetch")
const url = require("build-url")

const statusMap = {
  "En stock": "available",
  "Sous 7 jours": "available",
  "Entre 7/15 jours": "available",
  "+ de 15 jours": "available",
  Rupture: "unavailable",
}

exports.getOffers = async () => {
  const offers = []
  for (const gpu of ["19183", "19184", "19185"]) {
    const response = await fetch(
      url("https://www.ldlc.com", {
        path: `/recherche/+fcat-4684+fv121-${gpu}.html`,
      })
    )
    if (!response.ok) return []
    const text = await response.text()
    const $ = cheerio.load(text)
    $(".pdt-item").each((_, element) => {
      offers.push({
        store: "ldlc",
        key: $(element).data("id"),
        name: $(element).find(".title-3").text().trim(),
        price: $(element)
          .find(".price .price")
          .text()
          .trim()
          .replace(/\s+/g, ",")
          .replace(/^([0-9,]+)(€)(\d+)$/, "$2$1.$3"),
        status:
          statusMap[$(element).find(".modal-stock-web.stock").text().trim()] ||
          "unknown",
        url: `https://www.ldlc.com${$(element)
          .find(".title-3 a")
          .attr("href")}`,
      })
    })
  }
  return offers
}
