import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt,{ VerifyErrors} from "jsonwebtoken";
import { userService } from "../services/user.service.js";
import { env } from "../config/env.config.js";
import { UserRoleEnum } from "../utils/types/enum/role-enum.js";
import { UserRole } from "../models/user-role.model.js";
import { Role } from "../models/role.model.js";





const authenticate = async ( req:Request, res:Response, next:NextFunction):Promise<void>=>{

    //i write this logic , after doing frontend
//    if(!token){ return res.sendStatus(401)};


    const token ="fdsfsdfsd";

    //check if token is in db
    const isTokenActive = await userService.getIsTokenActive(token)
    .then((isTokenActive)=>{
        if(!isTokenActive){
            res.sendStatus(401);
            return 
        } 
    })

    

    //verify with jwt and get the user info
    jwt.verify( token, env.JWT_SECRET, ( err:any, decoded:unknown)=>{

        if(err){
            res.sendStatus(403);
            return;
        }

        try{

            const { id, email, roles} = decoded as RequestUser;
            req.user = { id, email, roles} ;
            next();
        }
        catch(err){
            console.log(err); 
            res.sendStatus(401);
            return;
        }
    })

}


const authorize = ( permittedRoles: Array<UserRoleEnum>)=>{
    return async ( req:Request, res:Response, next:NextFunction):Promise<void>=>{
        
        if(!req.user){
            res.sendStatus(403);
            return 
        }

        try{

        const userRoles = await UserRole.findAll({ where: { userId: req.user.id}, include: Role});

        const allRoles = userRoles.map(( userRole)=>{
            return userRole.role.name;
        })



        if( permittedRoles.some( (permittedRole)=> allRoles.includes(permittedRole)) ){
            next();
        }
        else{
             res.sendStatus(403);
             return
        }

        }
        catch(err){
            console.log(err);
            res.sendStatus(403);
            return;
        }


    }
}



export { authenticate, authorize};
















