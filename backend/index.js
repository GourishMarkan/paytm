const express = require("express");
const cors = require("cors");
const app = express();
const corsOptions = {
  origin: " http://localhost:5173/",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
const rootRouter = require("./routes/api/index");
const port = 3000;
app.use("/api/v1", rootRouter);
// app.use(bodyParser.urlencoded({ extended: true }));
app.listen(port, (e) => {
  e ? console.log(e) : console.log("fucking working");
});
