import jwt from "jsonwebtoken";

export const verifyToken = (
  req,
  res,
  next
) => {

  try {

    const authHeader =
      req.headers.authorization;

    if (!authHeader) {

      return res.status(401).json({

        success: false,

        message:
          "No token provided",

      });

    }

    /* ===== REMOVE BEARER ===== */

    const token =
      authHeader.startsWith(
        "Bearer "
      )
        ? authHeader.split(" ")[1]
        : authHeader;

    /* ===== VERIFY ===== */

    const decoded =
      jwt.verify(

        token,

        process.env.JWT_SECRET ||
        "mysecretkey"

      );

    req.user = decoded;

    next();

  } catch (error) {

    console.log(error);

    return res.status(401).json({

      success: false,

      message:
        "Invalid token",

    });

  }

};