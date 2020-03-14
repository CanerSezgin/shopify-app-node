const request = require("request-promise");

const getProducts = async (shop, accessToken) => {
  const url = "https://" + shop + "/admin/api/2019-10/products.json";
  console.log(url);
  const headers = {
    "X-Shopify-Access-Token": accessToken
  };

  try {
    const response = await request.get(url, { headers: headers });
    return JSON.parse(response).products;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getProducts
};
