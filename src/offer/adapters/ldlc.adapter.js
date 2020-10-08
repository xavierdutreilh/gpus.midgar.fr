const cheerio = require("cheerio")
const fetch = require("node-fetch")
const url = require("build-url")

const statusMap = {
  "+ de 15 jours": "available",
  "En stock": "available",
  Rupture: "unavailable",
}

exports.getOffers = async () => {
  const response = await fetch(
    url("https://www.ldlc.com", {
      path: `/recherche/+fcat-4684+fv121-19183,19185.html`,
    })
  )
  if (!response.ok) return []
  const text = await response.text()
  const $ = cheerio.load(text)
  return $(".pdt-item")
    .map((_, element) => ({
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
    }))
    .toArray()
}
