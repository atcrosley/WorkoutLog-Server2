const Sequelize = require("sequelize");

const sequelize = new Sequelize("workoutlog", "postgres", "Maddie01", {
  host: "localhost",
  dialect: "postgres",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("connection has been established successfully");
  })
  .catch((err) => {
    console.error("unable to connect to the database:", err);
  });

module.exports = sequelize;
