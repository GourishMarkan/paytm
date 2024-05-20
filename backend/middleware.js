const jwt = require("jsonwebtoken");
const JWT_SECRET = require("./config");
function authMiddleware(res, req, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({});
  }
  const token = authHeader.split(" ")[1];
  // if (token === NULL) return res.sendStatus(403);
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(403).json({});
  }
}
module.exports = {
  authMiddleware,
};
