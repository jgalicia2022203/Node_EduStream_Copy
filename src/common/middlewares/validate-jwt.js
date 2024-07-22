import jwt from "jsonwebtoken";
import User from "../../users/user.model.js";

export const validateJWT = async (req, res, next) => {
  let token =
    req.headers.token || req.query.token || req.headers["Authorization"];

  if (!token) {
    return res.status(401).send("A token is required for authentication");
  }

  try {
    token = token.replace(/^Bearer\s+/, "");
    const { uid } = jwt.verify(token, process.env.TOKEN_KEY);

    const user = await User.findById(uid);

    if (!user) {
      return res.status(401).json({
        msg: "User not exist in the DB",
      });
    }

    req.user = user;

    return next();
  } catch (e) {
    console.log(e);
    return res.status(401).send("Invalid Token");
  }
};

export default validateJWT;
