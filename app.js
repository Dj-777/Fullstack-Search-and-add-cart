const express = require("express");
const router = require("./routes");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.use("/api", router);
app.listen(PORT, (error) => {
  !error
    ? console.log(
        "Server is Successfully Running,  and App is listening on port " + PORT
      )
    : console.log("Error occurred, server can't start", error);
});
