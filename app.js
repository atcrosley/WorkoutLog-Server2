require("dotenv").config();
let express = require("express");
let app = express();
let sequelize = require("./db");

let user = require("./controllers/usercontroller");
let log = require("./controllers/logcontroller");

sequelize.sync();
app.use(require("./middleware/header"));
// sequelize.sync({ force: true });
app.use(express.json());

app.use("/user", user);
app.use("/log", log);

app.listen(3000, function () {
  console.log("app is listening on port 3000");
});
