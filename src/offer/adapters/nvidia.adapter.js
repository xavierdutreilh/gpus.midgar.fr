const fetch = require("node-fetch")
const url = require("build-url")

const statusMap = {
  buy_now: "available",
  gf_notify_me: "unavailable",
  upcoming: "unavailable",
  out_of_stock: "unavailable",
}

exports.getOffers = async () => {
  const response = await fetch(
    url("https://api.nvidia.partners", {
      path: "edge/product/search",
      queryParams: {
        page: 1,
        limit: 100,
        locale: "fr-fr",
        manufacturer: "NVIDIA",
        gpu: "RTX 3070,RTX 3080,RTX 3090",
        category: "GPU",
      },
    })
  )
  if (!response.ok) return []
  const data = await response.json()
  const items = [
    data.searchedProducts.featuredProduct,
    ...data.searchedProducts.productDetails,
  ]
  return items.map(
    ({
      productUPC: key,
      productTitle: name,
      productPrice: price,
      prdStatus: status,
    }) => ({
      store: "nvidia",
      key,
      name,
      price,
      status: statusMap[status] || "unknown",
    })
  )
}
