const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const imageRouter = require("./src/routes/image-route");
const axios = require("axios");

app.use("/", imageRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });

  return;
});

app.listen(port, "0.0.0.0", () => {
  console.log(`app listening at http://localhost:${port}`);
  const baseUrl = `http://localhost:${port}/`;
  axios.get(baseUrl);
});
