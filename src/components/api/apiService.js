const axios = require("axios");
const { createShopifyError } = require('../../lib/helpers');

class ShopifyAPI {
  constructor(shop, accessToken) {
    this.accessToken = accessToken;
    this.shop = shop;
    
    this.client = axios.create({
        baseURL: `https://${shop}.myshopify.com`,
        headers: { 'X-Shopify-Access-Token': this.accessToken }
    })
  }

  /**
   * Retrieves a list of products
   */
  async getProducts() {
    try {
        const method = 'get';
        const url = `/admin/api/2020-01/products.json`

        const response = await this.client({method, url})
        return response.data;
    } catch (error) {
        throw createShopifyError(error, this.shop)
    }
  }

}

module.exports = ShopifyAPI;