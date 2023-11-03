const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  try {
    let clientToken = req.headers.authorization.split(" ")[1];
    if (!clientToken) {
      return res.status(403).send({ msg: "Token not exist" });
    } else {
      let decoded = jwt.verify(clientToken, process.env.PRIVATE_TOKEN);
      if (!decoded) {
        return res.status(401).send({ msg: "Token must be expired" });
      } else {
        req.user = decoded;
        next();
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({msg: "Internal server error"});
  }
};

module.exports = verifyToken;