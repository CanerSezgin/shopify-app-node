const express = require("express");
const Router = express.Router();

const ShopifyController = require("../controllers/shopify");

Router.get("/", ShopifyController.installCtrl);
Router.get("/callback", ShopifyController.callbackCtrl);

module.exports = Router;
