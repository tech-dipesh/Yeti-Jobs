import "dotenv/config";
import jwt from "jsonwebtoken";
const VerifyJwt = (res, content) => {
  const storeJwt = jwt.sign(content, process.env.JSON_SECRET_KEY, {
    expiresIn: "7d",
  });
  const allCookiesOptinos = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: process.env.MAXAGE,
  };
  res.cookie("token", storeJwt, allCookiesOptinos);
};
export default VerifyJwt;
