const express = require("express");
const pageNotfoundcontoller = require("../controller/404");
const router = express.Router();

router.use("/food", require("./food.route"));
router.use("/**", pageNotfoundcontoller.apiRoute);
module.exports = router;
