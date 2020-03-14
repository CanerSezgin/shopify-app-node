const express = require("express");
const app = express();

const checkCridentials = require('./middlewares/checkCridentials');
const shopifyRoute = require("./routes/shopify");

app.get("/", (req, res) => {
  res.status(200).json({products: "asdasd" });
});

app.get("/a", (req, res) => {
    res.status(200).json({x: "x" });
  });

app.use("/shopify", checkCridentials, shopifyRoute);

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
