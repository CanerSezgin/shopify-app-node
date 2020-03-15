const axios = require("axios");

class ShopifyAPI {
  constructor(shop, accessToken) {
    this.accessToken = accessToken;
    this.shop = shop;
  }

  /**
   * Retrieves a list of products
   */
  async getProducts() {
      const method = 'get';
      const url = `https://${this.shop}.myshopify.com/admin/api/2020-01/products.json`

      const response = await axios({ method, url })
      return response.data;
  }

}

module.exports = ShopifyAPI;
