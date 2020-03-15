const { Router } = require("express");
/* const ShopifyService = require('./shopifyService'); */
const route = Router();
const ShopifyAPI = require("../api/apiService");

const s = new ShopifyAPI('dev-store-demo-pr', 'c9985f4bb1f42a514ebda9486f08076a');
route.get("/", async (req, res, next) => {
  try {
    console.log({
      params: req.params,
      query: req.query,
      body: req.body,
      session: req.session
    });
    const p = await s.getProducts();
    console.log(p);
    res.status(200).json({ token: "c9985f4bb1f42a514ebda9486f08076a" });
  } catch (error) {
      console.log(" --------- Controller", error)
    next(error);
  }
});

module.exports = route;
