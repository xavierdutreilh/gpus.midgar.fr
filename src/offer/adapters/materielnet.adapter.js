const cheerio = require("cheerio")
const fetch = require("node-fetch")
const FormData = require("form-data")
const url = require("build-url")

const statusMap = {
  "En stock": "available",
  "Sous 7 jours": "available",
  "Entre 7/15 jours": "available",
  "+ de 15 jours": "available",
  Rupture: "unavailable",
}

exports.getOffers = async () => {
  let response = await fetch(
    url("https://www.materiel.net", {
      path: "/recherche/+fcat-426+fv121-19183,19185.html",
    })
  )
  if (!response.ok) return []
  const text = await response.text()
  const $ = cheerio.load(text)
  const offers = $(".c-products-list__item")
    .map((_, element) => ({
      store: "materiel.net",
      key: $(element).data("id"),
      name: $(element).find(".c-product__title").text().trim(),
      price: $(element)
        .find(".o-product__price")
        .text()
        .trim()
        .replace(/\s+/g, ",")
        .replace(/^([0-9,]+)(€)(\d+)$/, "$2$1.$3"),
      status: "unknown",
    }))
    .toArray()
  const formData = new FormData()
  formData.append(
    "json",
    JSON.stringify({
      currencyISOCode3: "EUR",
      offers: offers.map(offer => ({ offerId: offer.key, marketplace: false })),
      shops: [{ shopId: -1 }],
    })
  )
  response = await fetch(
    url("https://www.materiel.net", { path: "/product-listing/stock-price/" }),
    {
      method: "POST",
      headers: { "X-Requested-With": "XMLHttpRequest" },
      body: formData,
    }
  )
  if (!response.ok) return []
  const data = await response.json()
  for (const offer of offers) {
    if (!data.stock[offer.key]) continue
    const $ = cheerio.load(data.stock[offer.key])
    offer.status =
      statusMap[$(".o-availability__value").text().trim()] || "unknown"
  }
  return offers
}
