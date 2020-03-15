const { UnknownError, AppError, ShopifyError } = require('../lib/errors'); 
const { splitShopifyUrl, isValidShopifyUrl } = require('../lib/helpers');

module.exports = async (err, req, res, next) => {
  // AppError
  if(err instanceof AppError) {
    return res.status(err.statusCode).json(err);
  }

  // Shopify Error
  if(err.isAxiosError && err.response.config && isValidShopifyUrl(err.response.config.url)) {
    const { status, config } = err.response;
    const { url, method } = config;
    const message = err.response.data.errors;
    return res.status(status).json(new ShopifyError(status, message, { method, ...splitShopifyUrl(url)}));
  }

  // Unknown - NonOperational Error
  const status = err.status || err.response.status || 400;
  return res.status(status).json(new UnknownError(status, error.message));
};

