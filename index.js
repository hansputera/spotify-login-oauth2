require("dotenv")
.config();

const app = require("express")();
const passport = require("passport");


app.use("/", require("./routes/index.js"));

const listener = app.listen(process.env.PORT, () => {
  console.log(`Listen to ${process.env.PORT}`);
});
