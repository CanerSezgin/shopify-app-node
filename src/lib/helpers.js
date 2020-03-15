const SHOPIFY_BASE_URL = '.myshopify.com';
const { AppError, ShopifyError } = require('./errors');

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
exports.isShopifyError = err => err.isAxiosError && err.response.config && exports.isValidShopifyUrl(err.response.config.url);
exports.createShopifyError = err => {
  const { status, config, data } = err.response;
  const { url, method } = config;
  const message = data.errors;
  return new ShopifyError(status, message, { method, ...exports.splitShopifyUrl(url)});
}