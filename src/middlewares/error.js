const { UnknownError, AppError, ShopifyError } = require("../lib/errors");
const { isShopifyError, createShopifyError } = require("../lib/helpers");

const getError = err => {
  // AppError && ShopifyError
  if (err instanceof AppError || err instanceof ShopifyError) {
    return err;
  }

  // Unhandled Shopify Error
  /* if (isShopifyError(err)) {
    return createShopifyError(err);
  } */

  // Unknown - NonOperational Error
  const status = err.status || err.response.status || 400;
  return new UnknownError(status, error.message);
};

module.exports = async (err, req, res, next) => {
  const error = getError(err);

  if (process.env.NODE_ENV === "development") {
    console.log("----------------------------");
    console.log(error);
    console.log("----------------------------");
  }

  res.status(error.statusCode).json(error);
};
