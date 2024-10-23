import jwt from "jsonwebtoken";

export const verifyToken = ( request, response, next) => {
    //console.log(request.cookies);
    const token = request.cookies.jwt;
    if (!token) return response.status(401).send("you are not authenticated!")
        jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
          if (err) return response.status(403).send("token is not valid!");
          request.userId = payload.userId;
          next();
    });
   // console.log({ token });
};