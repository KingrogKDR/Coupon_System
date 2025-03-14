import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.model.js";

const authAdminMiddleware = async (req, res, next) => {
    try {
        const token = await req.cookies.jsonWebToken;
    
        if(!token){
            return res.status(401).json({
                message: "No token, authorization denied"
            })
        }
    
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    
        const admin = await Admin.findById(decodedToken.admin.id) 
    
        if (!admin) {
            return res.status(401).json({ message: 'Token is valid but admin not found' });
        }
    
        req.admin = admin;
        next();
    } catch (error) {
        res.status(401).json({
            message: "Token is not valid"
        })
    }
}

export {authAdminMiddleware}