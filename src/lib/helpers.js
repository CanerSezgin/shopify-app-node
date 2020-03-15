const SHOPIFY_BASE_URL = '.myshopify.com';
const { AppError } = require('./errors');

exports.isValidShopifyUrl = url => url.includes('.myshopify.com')
exports.splitShopifyUrl = url => {
    if(!exports.isValidShopifyUrl(url)){
        throw new AppError(400, "This is not valid Shopify URL");
    }
    const split = url.split(SHOPIFY_BASE_URL)
    return {
      shop: split[0].split('://')[1],
      path: split[1]
    }
}