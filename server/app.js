const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

const userRouter = require("./routes/user");
const bookingRouter = require("./routes/bookings");
const scheduleRouter = require("./routes/busSchedule");
const notificationRouter = require("./routes/notifications");

app.use(morgan("dev"));

app.use("/users", userRouter);
app.use("/bookings", bookingRouter);
app.use("/schedules", scheduleRouter);
app.use("/notifications", notificationRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;

