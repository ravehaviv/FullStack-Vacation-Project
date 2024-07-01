import { NextFunction, Request, Response } from "express";
import userToken from "../2-utils/userToken";
import { UnauthorizedErorrModel } from "../4-models/errorModel";


async function verify_Admin(request:Request,response:Response,next:NextFunction) {
    
    try {
        
    const is_admin = await userToken.verifyAdmin(request);

    if(!is_admin) throw new UnauthorizedErorrModel();

    next();
    } catch (error:any) {
        next(error)
    }
}   

export default verify_Admin
