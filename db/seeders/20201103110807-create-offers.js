module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert("offers", [
      {
        store: "nvidia",
        key: "NVGFT080_FR",
        name: "NVIDIA GEFORCE RTX 3080",
        price: "€719.00",
        status: "unavailable",
        created_at: "2020-11-01T00:00:00.000Z",
        updated_at: "2020-11-01T00:00:00.000Z",
      },
      {
        store: "nvidia",
        key: "NVGFT090_FR",
        name: "NVIDIA GEFORCE RTX 3090",
        price: "€1,549.00",
        status: "unavailable",
        created_at: "2020-11-01T00:00:00.000Z",
        updated_at: "2020-11-01T00:00:00.000Z",
      },
      {
        store: "ldlc",
        key: "AR202009090076",
        name: "ASUS GeForce ROG STRIX RTX 3080 O10G GAMING",
        price: "€1,099.95",
        status: "unavailable",
        url: "https://www.ldlc.com/fiche/PB00375431.html",
        created_at: "2020-11-01T00:00:00.000Z",
        updated_at: "2020-11-01T00:00:00.000Z",
      },
      {
        store: "ldlc",
        key: "AR202009090081",
        name: "ASUS GeForce ROG STRIX RTX 3090 O24G GAMING",
        price: "€1,949.95",
        status: "unavailable",
        url: "https://www.ldlc.com/fiche/PB00369849.html",
        created_at: "2020-11-01T00:00:00.000Z",
        updated_at: "2020-11-01T00:00:00.000Z",
      },
    ])
  },
  down: async queryInterface => {
    await queryInterface.bulkDelete("offers", null, {})
  },
}
