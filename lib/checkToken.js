const { verify } = require("jsonwebtoken");

////////////////////////////////////////////////////////////////////////////////
// Middleware for checking if token is valid
////////////////////////////////////////////////////////////////////////////////
const checkToken = (req, res, next) => {
  const { token } = req.body;

  try {
    // Verifies the token stored (if any) is valid and stores the user's
    // info in the 'req.user' variable
    const user = verify(token, process.env.TOKEN_SECRET);
    /* if (Date.now() <= exp * 1000)
      return res.status(401).json({ message: "Token Expired!" }); */
    req.user = user.data;
    next();
  } catch (err) {
    // Deletes the invalid token and redirects the user to the main page
    return res.status(401).json(err);
  }
};

module.exports = { checkToken };
