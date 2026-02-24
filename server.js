import express from "express";

import HttpError from "./middleware/HttpError.js";
import router from "./routes/router.js";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.use("/profile", router);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello From Server..." });
});

app.use((req, res, next) => {
  next(new HttpError("Route Not Found", 404));
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  res
    .status(error.statusCode || 500)
    .json({ message: error.message || "Server Error" });
});

app.listen(port, () => {
  console.log("Server is running on port", port);
});
