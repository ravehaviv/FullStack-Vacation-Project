import { NextFunction, Request, Response, Router } from "express";
import vecationLogic from "../5-logic/vecation_logic";
import path from "path"
import vecationModel from "../4-models/vecationModel";
import { PhotoNameNotFoundErrorModel } from "../4-models/errorModel";
import verify_Admin from "../3-middleware/VerifyAdmin";
import Verify_logged_in from "../3-middleware/Verify_logged_in";


const vecation_route = Router();


vecation_route.get("/vecation",Verify_logged_in,async(request:Request, response:Response, next:NextFunction) => {

    try{
        const vecations = await vecationLogic.GetAllVecation();
        response.json(vecations)

    }catch(err:any){
        next(err)
    }


})

vecation_route.get("/vecation/:vecationId",Verify_logged_in,async(request:Request, response:Response, next:NextFunction) => {

    try{
        const id = +request.params.vecationId;
        const vecation = await vecationLogic.GetOneVecation(id);
        response.json(vecation)

    }catch(err:any){
        next(err)
    }

});


vecation_route.delete("/vecation/:vecationId",verify_Admin,async(request:Request, response:Response, next:NextFunction) => {
    
    try{
        const id = +request.params.vecationId;
         await vecationLogic.DeleteOneVecation(id);
        response.status(200)
        
    }catch(err:any){
        next(err)
    }
    
});

vecation_route.post("/vecation",verify_Admin,async(request:Request, response:Response, next:NextFunction) => {

    try{
           
        request.body.image = request.files?.image       
        const vecation = new vecationModel(request.body)
        const newVecation = await vecationLogic.AddOneVaction(vecation)
        response.status(201).json(newVecation)
        
    }catch(err:any){
        next(err)
    }
    

    
})

vecation_route.put("/vecation/:vecationId",verify_Admin,async(request:Request, response:Response, next:NextFunction) => {
    
    try{
        
        
        request.body.id = +request.params.vecationId;
        request.body.image = request.files?.image;
     
        
        const vecation = new vecationModel(request.body);
        
        const update = await vecationLogic.updateVecation(vecation);
        response.json(update)
        
    }catch(err:any){
        next(err)
    }
    
    
    
})

//image
vecation_route.get("/vecation/images/:imagename",async(request:Request,response:Response,next:NextFunction)=>{
    try {

        const imageName = request.params.imagename;
        
        const absoulthpath = path.join(__dirname,"..","1-assets","images",imageName)
        
        if(!absoulthpath) throw new PhotoNameNotFoundErrorModel(imageName)
        
            response.sendFile(absoulthpath);
            
            
        } catch (error:any) {
        next(error)
    }
    
})

//conditions
vecation_route.get("/vecation/conditions/byuser/:userid",Verify_logged_in,async(request:Request, response:Response, next:NextFunction) => {

    try{
        const userID = +request.params.userid;
        const vecations = await vecationLogic.GetVecatiosByFollow(userID);
        response.json(vecations)

    }catch(err:any){
        next(err)
    }



});
vecation_route.get("/vecation/conditions/dontstart",Verify_logged_in,async(request:Request, response:Response, next:NextFunction) => {

    try{
    
        const vecations = await vecationLogic.GetVecationsDontStart();
        response.json(vecations)

    }catch(err:any){
        next(err)
    }



});
vecation_route.get("/vecation/conditions/between",Verify_logged_in,async(request:Request, response:Response, next:NextFunction) => {

    try{
    
        const vecations = await vecationLogic.GetActiveVecations();
        response.json(vecations)

    }catch(err:any){
        next(err)
    }



});
export default vecation_route