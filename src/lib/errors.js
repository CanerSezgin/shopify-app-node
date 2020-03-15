class CustomError extends Error {
  /**
   * @param {number} statusCode - HTTP statusCode Codes
   * @param {string} message - Error Message
   * @param {boolean} isOperational - Operational errors refer to situations where you understand what happened and the impact of it.
   */
  constructor(statusCode, message, isOperational) {
    super();
    Error.call(this);
    Error.captureStackTrace(this);
    this.status = "error";
    this.statusCode = statusCode;
    this.message = message;
    this.isOperational = isOperational;
  }
}

class UnknownError extends CustomError {
  constructor(statusCode, message) {
    super(statusCode, message, false);
    this.type = "unknown";
  }
}

class AppError extends CustomError {
  constructor(statusCode, message) {
    super(statusCode, message, true);
    this.type = "app";
  }
}

class ShopifyError extends CustomError {
  constructor(statusCode, message, shopify) {
    super(statusCode, message, true);
    this.type = "shopify";
    this.shopify = {}

    Object.keys(shopify).forEach(key => {
      this.shopify[key] = shopify[key];
    });
  }
}

module.exports = {
  UnknownError,
  AppError,
  ShopifyError
};
