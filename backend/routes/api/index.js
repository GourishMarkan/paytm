const express = require("express");
const router = express.Router();
const userRouter = require("./user");
router.use("/user", userRouter);
router.post("/signUp", (req, res, next) => {
  console.log("signup working");
});
router.get("/signIn", (req, res, next) => {
  console.log("signUp working");
});
router.put("/update", (req, res, next) => {
  console.log("update");
});
module.exports = router;
