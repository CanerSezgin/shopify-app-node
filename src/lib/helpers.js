const SHOPIFY_BASE_URL = '.myshopify.com';
const { AppError, ShopifyError } = require('./errors');

exports.isValidShopifyUrl = url => {
    console.log(url)
    return url.includes('.myshopify.com')
}
exports.isShopifyError = err => err.isAxiosError && err.response.config && exports.isValidShopifyUrl(err.response.config.url);
exports.createShopifyError = (err, shop) => {
  const { status, config, data } = err.response;
  const { url, method } = config;
  const message = data.errors;
  return new ShopifyError(status, message, { method, url, shop });
}