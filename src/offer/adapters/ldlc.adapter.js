const cheerio = require("cheerio")
const fetch = require("node-fetch")
const url = require("build-url")

const gpuMap = {
  rtx3080: "+fcat-4684+fv121-19183",
  rtx3090: "+fcat-4684+fv121-19185",
}

exports.getOffers = async gpu => {
  if (!gpuMap[gpu]) return []
  const response = await fetch(
    url("https://www.ldlc.com", {
      path: `/recherche/${gpuMap[gpu]}.html`,
    })
  )
  if (!response.ok) return
  const text = await response.text()
  const $ = cheerio.load(text)
  return $(".pdt-item")
    .map((_, element) => {
      const name = $(element).find(".title-3").text().trim()
      const status = $(element).find(".modal-stock-web.stock").text().trim()
      return { store: "ldlc", name, status }
    })
    .toArray()
}
