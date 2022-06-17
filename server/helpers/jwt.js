const { expressjwt: expressJwt } = require("express-jwt");

// Working with fail props in expressJwt
// function sendUnauthorized(req, res) {
//   console.log(req.headers.authorization);
//   console.log(req.user);
//   res.status(401).json({ message: "Unathorized" });
// }

function authenticationJwt() {
  const secret = process.env.SECRET;
  return expressJwt({
    secret,
    algorithms: ["HS256"],
  });
}

module.exports = authenticationJwt;
