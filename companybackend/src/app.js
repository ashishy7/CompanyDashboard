//dependencies//
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
import CompanyRouter from "./Routes/Company";
import EmployeeRouter from "./Routes/Employee";
//dependencies//

//Objects//
const App = express();
//Objects//
//DB CONNECTION//
mongoose
  .connect(process.env.DB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log("Connected To Data Base "))
  .catch((err) => {
    console.log("err while connecting to the DB");
  });
//DB CONNECTION//
App.use(express.json());

var whitelist = ["http://localhost:3000","http://localhost:3002",undefined];
App.use(
  cors({
    origin: function (origin, callback) {
      console.log(origin);
      if (whitelist.indexOf(origin) !== -1) {
        console.log("ALLOWED", origin);
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS " + origin));
      }
    },
    credentials: true,
  })
);

//routes//

App.use("/api", CompanyRouter);
App.use("/api", EmployeeRouter);

App.get("/", (req, res) => {
  res.json({ res: JSON.stringify(req.headers) });
});
//routes//
App.listen(8080, () => console.log("server is up and running at 8080 "));
