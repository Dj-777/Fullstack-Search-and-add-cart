let data = require("../../Project1forntend/sreachabdcart/src/data.json");
let price = require("../../Project1forntend/sreachabdcart/src/price.json");
let getFoodData = (req, res) => {
  let name = req.query.name;

  let returnData = data.filter((item) => {
    return item.name.match(new RegExp(name, "gi"));
  });

  return res.status(200).send({
    returnData,
    message: "Api called successfully",
  });
};
let getFoodDataByid = (req, res) => {
  let food_id = req.query.food_id;
  let returnData = price.filter((item) => {
    return item.food_id === parseInt(food_id);
  });

  return res.status(200).send({
    returnData,
    message: "Api called successfully",
  });
};
module.exports = {
  getFoodData,
  getFoodDataByid,
};
