const fetch = require("node-fetch")
const url = require("build-url")

const gpuNames = {
  rtx3070: "RTX 3070",
  rtx3080: "RTX 3080",
  rtx3090: "RTX 3090",
}

const statusMap = {
  buy_now: "available",
  gf_notify_me: "unavailable",
  upcoming: "unavailable",
}

exports.getOffers = async gpu => {
  if (!gpuNames[gpu]) return []
  const response = await fetch(
    url("https://api.nvidia.partners", {
      path: "edge/product/search",
      queryParams: {
        page: 1,
        limit: 100,
        locale: "fr-fr",
        manufacturer: "NVIDIA",
        gpu: gpuNames[gpu],
        category: "GPU",
      },
    })
  )
  if (!response.ok) return []
  const data = await response.json()
  const items =
    data.searchedProducts.featuredProduct.gpu === gpuNames[gpu]
      ? [
          data.searchedProducts.featuredProduct,
          ...data.searchedProducts.productDetails,
        ]
      : data.searchedProducts.productDetails
  return items.map(
    ({ productTitle: name, productPrice: price, prdStatus: status }) => ({
      store: "nvidia",
      name,
      price,
      status: statusMap[status] || "unknown",
    })
  )
}
