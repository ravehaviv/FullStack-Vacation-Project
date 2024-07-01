import { NextFunction, Request, Response } from "express";
import { RouteNotFound} from "../4-models/errorModel";


function routeNotFound(request:Request, Response:Response, next:NextFunction ):void{

    const err = new RouteNotFound(request.originalUrl)
    next(err)    
}

export default routeNotFound