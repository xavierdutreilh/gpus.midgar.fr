const cheerio = require("cheerio")
const fetch = require("node-fetch")
const url = require("build-url")

const gpuIds = {
  rtx3080: 19183,
  rtx3090: 19185,
}

const statusMap = {
  "+ de 15 jours": "available",
  "En stock": "available",
  Rupture: "unavailable",
}

exports.getOffers = async gpu => {
  if (!gpuIds[gpu]) return []
  const response = await fetch(
    url("https://www.ldlc.com", {
      path: `/recherche/+fcat-4684+fv121-${gpuIds[gpu]}.html`,
    })
  )
  if (!response.ok) return []
  const text = await response.text()
  const $ = cheerio.load(text)
  return $(".pdt-item")
    .map((_, element) => {
      const name = $(element).find(".title-3").text().trim()
      const price = $(element)
        .find(".price .price")
        .text()
        .trim()
        .replace(/\s+/g, ",")
        .replace(/^([0-9,]+)(€)(\d+)$/, "$2$1.$3")
      const status =
        statusMap[$(element).find(".modal-stock-web.stock").text().trim()] ||
        "unknown"
      return { store: "ldlc", name, price, status }
    })
    .toArray()
}
