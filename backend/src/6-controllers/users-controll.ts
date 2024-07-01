import express, { NextFunction, Request, Response } from "express";

import userModel from "../4-models/userModel";
import usersLogic from "../5-logic/users-logic";
import credencialModel from "../4-models/credencialModel";

const users_route = express.Router()

users_route.post("/auth/register",async (request:Request,response:Response,next:NextFunction) => {

    try{
        const user =  new userModel(request.body)
       
        

        const token = await usersLogic.register(user)

        response.status(201).json(token);
    }catch(err:any){
        next(err)
    }

});

users_route.post("/auth/login", async(request:Request , response:Response, next:NextFunction) => {

    try{
        const user = new credencialModel(request.body);
          
        const token = await usersLogic.login(user);

        response.status(201).json(token);

    }catch(err:any){
        next(err)
    }
})



export default users_route