const jwt = require("jsonwebtoken");

const secret = process.env.TOKEN_SECRET;
const expiration = `${process.env.MAX_AGE}s`;

// Updated signToken to get more fields to be used on the FE
const signToken = ({ password, ...others }) => {
  const payload = { ...others };

  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

module.exports = { signToken };
