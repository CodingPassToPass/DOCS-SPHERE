import jwt from "jsonwebtoken";
import { userService } from "../services/user.service.js";
import { env } from "../config/env.config.js";
const authenticate = async (req, res, next) => {
    //i write this logic , after doing frontend
    //    if(!token){ return res.sendStatus(401)};
    const token = "fdsfsdfsd";
    //check if token is in db
    const isTokenActive = await userService.getIsTokenActive(token)
        .then((isTokenActive) => {
        if (!isTokenActive)
            return res.sendStatus(401);
    });
    //verify with jwt and get the user info
    jwt.verify(token, env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.sendStatus(403);
        }
        try {
            const { id, email, roles } = decoded;
            req.user = { id, email, roles };
            next();
        }
        catch (err) {
            console.log(err);
            res.sendStatus(401);
        }
    });
};
export { authenticate };
