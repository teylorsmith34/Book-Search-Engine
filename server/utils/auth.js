// const jwt = require("jsonwebtoken");

// const secret = "mysecretsshhhhh";
// const expiration = "2h";

// module.exports = {
//   authMiddleware: function ({ req }) {
//     let token = req.body.token || req.query.token || req.headers.authorization;

//     if (req.headers.authorization) {
//       token = token.split(" ").pop().trim();
//     }

//     if (!token) {
//       return req;
//     }

//     try {
//       const { data } = jwt.verify(token, secret, { maxAge: expiration });
//       req.user = data;
//     } catch {
//       console.log("Invalid token");
//     }

//     return req;
//   },
//   signToken: function ({ username, email, _id }) {
//     const payload = { username, email, _id };
//     return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
//   },
// };

const { AuthenticationError } = require('apollo-server-express');
const { verifyToken } = require('../utils/auth');

const authMiddleware = ({ req }) => {
  let token = req.body.token || req.query.token || req.headers.authorization;

  if (token) {
    token = token.split(' ').pop().trim();
  
    try {
      const user = verifyToken(token);
      return user;
    } catch (err) {
      throw new AuthenticationError('Invalid token');
    }
  }
  
  throw new AuthenticationError('Missing token');
