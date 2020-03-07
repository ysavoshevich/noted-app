const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      const error = new Error("Not authenticated.");
      error.statusCode = 401;
      error.message = "Not authenticated.";
      throw error;
    }
    const token = authHeader.split(" ")[1];
    let decodedToken = jwt.verify(
      token,
      "3AF8078575F2572FA06FD33ED59BC68C58EE85E0D3DB059AE3539E6B7DAB6B42"
    );
    if (!decodedToken) {
      const error = new Error("Not authenticated.");
      error.statusCode = 401;
      error.message = "Not authenticated.";
      throw error;
    }
    req.email = decodedToken.email;
    next();
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
};
