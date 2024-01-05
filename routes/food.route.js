const express = require("express");
const {
  getFoodData,
  getFoodDataByid,
} = require("../controller/food.controller");
const pageNotfoundcontoller = require("../controller/404");
const foodRouter = express.Router();

foodRouter.get("/search", getFoodData);
foodRouter.get("/getFoodDataByid", getFoodDataByid);
foodRouter.use("/**", pageNotfoundcontoller.apiRoute);
module.exports = foodRouter;
