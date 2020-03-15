const handleError = require('./middlewares/error');

const shopifyRoute = require('./components/shopify/shopifyController');
const appRoute = require('./components/app/appController');
const checkCridentials = require('./middlewares/checkCridentials');

const statusCheck = (req, res) => res.status(200).json({ status: "ok" });
module.exports = app => {
  app.use("/status", statusCheck);
  app.use("/shopify", checkCridentials, shopifyRoute);
  app.use("/", appRoute);

  app.use(handleError);
};