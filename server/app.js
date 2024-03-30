const express = require("express");
const morgan = require("morgan");

const app = express();
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

const userRouter = require("./routes/user");
const bookingRouter = require("./routes/bookings");
const scheduleRouter = require("./routes/busSchedule");
const notificationRouter = require("./routes/notifications");
const globalErrorHandler = require("./controllers/errorController");

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(morgan("dev"));

app.use("/users", userRouter);
app.use("/bookings", bookingRouter);
app.use("/schedules", scheduleRouter);
app.use("/notifications", notificationRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the bus booking API");
});

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);

module.exports = app;
