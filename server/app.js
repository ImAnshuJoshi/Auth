const express = require("express");
const app = express();
const authRouter = require("./routers/authRouter");
const userRouter = require("./routers/userRouter");
let cors = require("cors");
const morgan = require("morgan");
const errorHandler = require("./Middlewares/errorHandler");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "10kb" }));

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/", (req, res, next) => {
  //Server is up
  res.status(200).json({
    success: true,
    message: "Server is up",
  });
});
app.use(errorHandler);

module.exports = app;
