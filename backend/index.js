const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 5000;

const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");
const errorHandler = require("./middlewares/error");

app.use(bodyParser.json());

// routes
app.use("/admin", adminRouter);
app.use("/user", userRouter);

// error handling
app.use(errorHandler);

app.listen(PORT);
