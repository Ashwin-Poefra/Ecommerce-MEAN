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
    algorithms: ["HS256"],
    isRevoked: isRevoked,
  }).unless({
    path: [
      { url: /\/public\/uploads(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/products(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/categories(.*)/, methods: ["GET", "OPTIONS"] },
      `${api}/users/login`,
      `${api}/users/register`,
    ],
  });
}

async function isRevoked(req, token) {
  // token now contains payload data
  console.log(token);

  if (!token.payload.isAdmin) {
    return true; // if the isAdmin flag in payload is false, then we reject the token
  }
  return false;
}

module.exports = authenticationJwt;
