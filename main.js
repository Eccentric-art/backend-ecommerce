const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const connectDB = require("./Config/db.JS");
const color = require("colors");
const productRoutes = require("./routes/Product");

// const contentRoutes = require("./routes/Content");
const bodyparser = require("body-parser");
const app = express();
const UserRoutes = require("./routes/User");

connectDB();

app.use(cors());
app.use(bodyparser.json());
const port = process.env.port;
app.use("/Users", UserRoutes);
app.use("/products", productRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`.yellow));
