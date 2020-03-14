const querystring = require("querystring");
const crypto = require("crypto");

const hmacValidator = (query, hmac, apiSecret) => {
  const map = Object.assign({}, query);
  delete map["signature"];
  delete map["hmac"];
  const message = querystring.stringify(map);
  const providedHmac = Buffer.from(hmac, "utf-8");
  const generatedHash = Buffer.from(
    crypto
      .createHmac("sha256", apiSecret)
      .update(message)
      .digest("hex"),
    "utf-8"
  );
  let hashEquals = false;
  // timingSafeEqual will prevent any timing attacks. Arguments must be buffers
  try {
    hashEquals = crypto.timingSafeEqual(generatedHash, providedHmac);
    // timingSafeEqual will return an error if the input buffers are not the same length.
  } catch (e) {
    hashEquals = false;
  }
  return hashEquals;
};

module.exports = hmacValidator;
