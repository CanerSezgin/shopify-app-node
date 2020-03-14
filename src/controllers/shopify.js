const axios = require("axios");

const hmacValidator = require("../lib/hmacValidator");

const installCtrl = (req, res, next) => {
  const { SHOPIFY_API_KEY, SHOPIFY_API_SECRET, SHOP, HOST, SCOPES } = res.locals.credential

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

  return res.status(200).json(installUrl)
  res.redirect(installUrl);

};

const getAccessTokenWithScope = async (code) => {
    const url = "https://" + SHOP + "/admin/oauth/access_token";
    const payload = {
        client_id: SHOPIFY_API_KEY,
        client_secret: SHOPIFY_API_SECRET,
        code
    };

    const response = await axios.post(url, payload);
    return response.data
}

const callbackCtrl = async (req, res) => {
    try {
        const { shop, hmac, code } = req.query;
        if (shop && hmac && code) {
          const hashEquals = hmacValidator(req.query, hmac, SHOPIFY_API_SECRET);
          if (!hashEquals) {
            return res.status(400).send("HMAC validation failed");
          }
      
          const { access_token: accessToken, scope } = await getAccessTokenWithScope(code)
          // TODO: Store accessToken && Scope in your db
          return res.status(200).json({message: 'App Successfully Installed', accessToken, scope})
      
        } 
        return res.status(400).json({ message: 'Wrong or Missing Query' })
    } catch (error) {
        res.status(error.response.status || 400).json(error.message)
    }
};

module.exports = {
  installCtrl,
  callbackCtrl
};
