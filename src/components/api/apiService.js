const axios = require("axios");
const { createShopifyError } = require('../../lib/helpers');

class ShopifyAPI {
  constructor(shop, accessToken) {
    this.accessToken = accessToken;
    this.shop = shop;
  }

  /**
   * Retrieves a list of products
   */
  async getProducts() {
    try {
        const method = 'get';
        const url = `https://${this.shop}.myshopify.com/admin/api/2020-01/products.json`
        const headers = {'X-Shopify-Access-Token': this.accessToken}
        
        const response = await axios({ method, url, headers })
        return response.data;
    } catch (error) {
        throw createShopifyError(error)
    }
  }

}

module.exports = ShopifyAPI;
