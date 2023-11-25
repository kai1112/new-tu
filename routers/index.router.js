const router = require("express").Router();

const authRoute = require("./user.router");
router.use("/users", authRoute);

const listTypeProduct = require("./listTypeProduct.router");
router.use("/api", listTypeProduct);

module.exports = router;
