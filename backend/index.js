const express = require("express");
const cors = require("cors");
const rootRouter = require("./routes/api/index");
const { dbConnect } = require("./db");
const app = express();
// const corsOptions = {
//   origin: " http://localhost:5173/",
//   optionsSuccessStatus: 200,
// };

app.use(cors());
app.use(express.json());
app.use("/api/v1", rootRouter);

// app.use(bodyParser.urlencoded({ extended: true }));
app.listen(3000, () => {
  dbConnect(), console.log(dbConnect);
});
