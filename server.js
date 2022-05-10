const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
//Connect to mongoose
const mongo_URI = process.env.MONGO_URI;
mongoose
  .connect(mongo_URI)
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));
//Routes
app.use("/api/v1", require("./routes/userRoutes"));
process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});