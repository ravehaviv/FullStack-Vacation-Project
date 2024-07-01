import express, { NextFunction,Request ,Response} from "express";
import followersLogic from "../5-logic/followers-logic";
import followersModel from "../4-models/followerModel";
import Verify_logged_in from "../3-middleware/Verify_logged_in";






 const followers_route = express.Router();


followers_route.get("/followers/:user_id/:vecation_id",Verify_logged_in,async(request:Request, response:Response, next:NextFunction) => {

    try{

        request.body.userID = +request.params.user_id
        request.body.vecation_id = +request.params.vecation_id

        
        
      
        const followers = await followersLogic.GetFollowersById(new followersModel(request.body))
 
        
        response.send(followers)
 

    }catch(err:any){
        next(err)
    }



})
followers_route.get("/followers/csv",Verify_logged_in,async(request:Request, response:Response, next:NextFunction) => {

    try{
      
        const csv = await followersLogic.GetCsv()
        
        response.json(csv)
 

    }catch(err:any){
        next(err)
    }



})

followers_route.post("/followers",Verify_logged_in,async(request:Request, response:Response, next:NextFunction) => {

    try{
       
       
       
        
   
        await followersLogic.SaveFollow(new followersModel(request.body))
       
        

    }catch(err:any){
        next(err)
    }



})
followers_route.delete("/followers/:user_id/:vecation_id",Verify_logged_in,async(request:Request, response:Response, next:NextFunction) => {

    try{
     
        const user_id = +request.params.user_id
        const vecation_id = +request.params.vecation_id
    
        await followersLogic.Unfollow(user_id,vecation_id)
       
        

    }catch(err:any){
        next(err)
    }



});

export default followers_route


