const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET_JWT;

const generateJWT = (uid, name) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name };
    jwt.sign(
      payload,
      secret,
      {
        expiresIn: "2h",
      },
      (err, token) => {
        if (err) {
          reject("No se pudo generar el JWT");
        }
        resolve(token);
      }
    );
  });
};

module.exports = {
  generateJWT,
};
