const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    console.log(req.cookies.token);
    const token = req.cookies.token;
    if (!token) {
      res.redirect("/");
      throw new Error("User not Signed in, Sign in First.");
    }
    jwt.verify(token, process.env.JWT, (err, decoded) => {
      if (err) {
        throw new Error("User not Signed in, Sign in First.");
      } else {
        console.log(decoded);
        req.email = decoded.email;
        req.id = decoded.id;
      }
    });
    next();
  } catch (err) {
    next(err);
  }
};
