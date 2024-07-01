import { NextFunction, Request, Response } from "express";
import userToken from "../2-utils/userToken";
import { NotLoggedInErrorModel } from "../4-models/errorModel";


async function Verify_logged_in(request:Request,response:Response,next:NextFunction) {
    
    try {
        
    
        
        const is_logged = await userToken.validateToken(request);
            
            
        if(!is_logged) throw new NotLoggedInErrorModel();

    next();
    } catch (error:any) {
        next(error)
    }
}   

export default Verify_logged_in
