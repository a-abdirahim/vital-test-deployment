const path = require("path");
const express = require("express");
const cors = require("cors");
const app = express();

const productRouter = require("./routes/Allroutes");
const subCategoryRouter = require("./routes/subCategoryRoutes");
const categoryRouter = require("./routes/CategoryRoutes");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// app.use(
//   cors({
//     origin: [
//       "http://127.0.0.1:3000",
//       "https://rich-tan-barnacle-tam.cyclic.app/",
//     ],
//     credentials: true,
//     exposedHeaders: ["Content-Range"],
//   })
// );

app.use(cors());

// set http headers

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use("/api/v1/products", productRouter);
app.use("/api/v1/products/subCategory", subCategoryRouter);
app.use("/api/v1/products/category", categoryRouter);

app.use(express.static(path.join(__dirname, "./Client/dist")));

app.use(
  "/public/uploads",
  express.static(path.join(__dirname, "public/uploads"))
);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./Client/dist/index.html"));
});

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `cant find ${req.originalUrl} on this server!`,
  });
});
module.exports = app;
