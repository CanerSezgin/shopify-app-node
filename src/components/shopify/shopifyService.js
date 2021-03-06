const axios = require("axios");
const { AppError } = require("../../lib/errors");
const hmacValidator = require("../../lib/hmacValidator");

class ShopifyService {
  constructor(credential) {
    this.credential = credential;
  }
  getInstallURL() {
    const { SHOPIFY_API_KEY, SHOP, HOST, SCOPES } = this.credential;
    const redirectUri = HOST + "/shopify/callback";
    const installUrl =
      "https://" +
      SHOP +
      "/admin/oauth/authorize?client_id=" +
      SHOPIFY_API_KEY +
      "&scope=" +
      SCOPES +
      "&redirect_uri=" +
      redirectUri;
    return installUrl;
  }

  async getAccessTokenWithScope(code) {
    const { SHOPIFY_API_KEY, SHOPIFY_API_SECRET, SHOP } = this.credential;
    const url = "https://" + SHOP + "/admin/oauth/access_token";
    const payload = {
      client_id: SHOPIFY_API_KEY,
      client_secret: SHOPIFY_API_SECRET,
      code
    };

    const response = await axios.post(url, payload);
    return response.data;
  }

  async validateAndRegisterShop(query) {
    const { SHOPIFY_API_SECRET } = this.credential;
    const { shop, hmac, code } = query;
    if (!shop && !hmac && !code) {
      throw new AppError(400, "Wrong or Missing Query");
    }

    // HMAC Validation
    const hashEquals = hmacValidator(query, hmac, SHOPIFY_API_SECRET);
    if (!hashEquals) {
      throw new AppError(400, "HMAC validation failed");
    }

    // Get Access Token and Scopes && Save
    try {
        const { access_token: accessToken, scope} = await this.getAccessTokenWithScope(code);
        // TODO: Store accessToken && Scope in your db
        return { message: "App Successfully Installed", accessToken, scope };
    } catch (error) {
        throw new AppError(error.response.status || 400, `Access Token Issue`)
    }
  }
}

module.exports = ShopifyService;
