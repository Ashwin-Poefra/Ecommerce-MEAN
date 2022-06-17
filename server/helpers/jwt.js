const { expressjwt: expressJwt } = require("express-jwt");

// Working with fail props in expressJwt
// function sendUnauthorized(req, res) {
//   console.log(req.headers.authorization);
//   console.log(req.user);
//   res.status(401).json({ message: "Unathorized" });
// }

function authenticationJwt() {
  const secret = process.env.SECRET;
  const api = process.env.API_URL;
  return expressJwt({
    secret,
    audience:'http://localhost:4200/',
    issuer:'http://localhost:3000/',
    algorithms: ["HS256"],
  }).unless({
    path: [
      { url: /\/api\/v1\/products(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/categories(.*)/, methods: ["GET", "OPTIONS"] },
      `${api}/users/login`,
      `${api}/users/register`,
    ],
  });
}

module.exports = authenticationJwt;
