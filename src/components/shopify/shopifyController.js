const { Router } = require('express');
const ShopifyService = require('./shopifyService');
const route = Router();

route.get("/", (req, res, next) => {
    const { credential } = res.locals;
    const service = new ShopifyService(credential)
    const installUrl = service.getInstallURL(res.locals.credential);
    console.log(installUrl)
    res.redirect(installUrl);
});

route.get("/callback", async (req, res, next) => {
    try {
        const { credential } = res.locals;
        const service = new ShopifyService(credential)
        const response = await service.validateAndRegisterShop(req.query)
        res.status(200).json(response)
    } catch (error) {
        next(error);
    }
});

module.exports = route;