
import { DeleteVecationErrorModel, ResourceNotFoundErrorModel, validationErrorModel } from "../4-models/errorModel";
import vecationModel from "../4-models/vecationModel";
import { v4 as uuid} from 'uuid'
import fs from "fs"
import DataAccessLevel from "../2-utils/DataAccessLevel";
import { OkPacket } from "mysql";








async function GetAllVecation():Promise<vecationModel[]>{

     //create query
     const sql  =  `SELECT vacationID as id, destination,description, startDate,endDate,price,photoName FROM vacations`;
     const data = await DataAccessLevel.execute(sql);
     const vecations:vecationModel[] = data
     
     
     return vecations;
     
     
    }

async function GetOneVecation(id:number):Promise<vecationModel>{
        
        
        const sql  =  `
                    SELECT vacationID as id, destination, startDate,endDate,price,photoName 
                    FROM vacations WHERE vacationID = ${id};`;

        const response = await DataAccessLevel.execute(sql);

        const vecation = response[0];

        //if no vecation error
        if(!vecation) throw new ResourceNotFoundErrorModel(id)

         return vecation
    
}

async function DeleteOneVecation(id:number):Promise<void>{

    //get photo name and id
    let sql  =
                  `SELECT photoName ,vacationID
                   FROM vacations WHERE vacationID = ${id};`;

    const response= await DataAccessLevel.execute(sql);
    
    // check if there is data in response
    if(response.length === 0)throw new DeleteVecationErrorModel(id);
    

    if(response[0].photoName){
        if(fs.existsSync("./src/1-assets/images/"+response[0].photoName))
        //delete
        fs.unlinkSync("./src/1-assets/images/"+response[0].photoName)
    }

    sql  =  `DELETE FROM vacations WHERE vacationID = ${id}`;
    
    const info:OkPacket = await DataAccessLevel.execute(sql);
    //server err info
    
}

async function AddOneVaction(vecation:vecationModel):Promise<vecationModel>{
    

    const err = vecation.validation()
    if(err) throw new validationErrorModel(err);
    

    
    // get image and save
    if(vecation.image){
        
        const ext = vecation.image.name.substring(vecation.image.name.lastIndexOf("."));
        vecation.photoName = uuid() +ext;
        await vecation.image.mv("./src/1-assets/images/" + vecation.photoName)  
        delete vecation.image;
        
    }
   
    
    const sql  =  
    `INSERT INTO vacations(vacationID, destination,description,startDate,endDate,price,photoName)
     VALUES(DEFAULT,"${vecation.destination}","${vecation.description}","${vecation.startDate}","${vecation.endDate}","${vecation.price}","${vecation.photoName}");`;

    const info:OkPacket = await DataAccessLevel.execute(sql);


    vecation.id = info.insertId;

    return vecation
}


async function updateVecation(vecation:vecationModel):Promise<vecationModel>{

    //validation
    
    const err = vecation.validation();
    if(err) throw new validationErrorModel(err)

    //getAllvecation
    const oldVacation = await GetOneVecation(vecation.id)
    if(!oldVacation) throw new ResourceNotFoundErrorModel(vecation.id)
    
        

    //update image or delete by name 
    if(vecation.image){
        if(fs.existsSync("./src/1-assets/images/"+oldVacation.photoName))
        //delete
        fs.unlinkSync("./src/1-assets/images/"+oldVacation.photoName)
        
        const extension = vecation.image.name.substring(vecation.image.name.lastIndexOf("."))
        vecation.photoName = uuid() + extension;
        await vecation.image.mv("./src/1-assets/images/"+vecation.photoName)
        delete vecation.image;
    }else{
        vecation.photoName = oldVacation.photoName
    }



    
    
    
    const sql = `UPDATE vacations SET
                destination = "${vecation.destination}",
                description = "${vecation.description}",
                startDate = "${vecation.startDate}",
                endDate = "${vecation.endDate}",
                price = "${vecation.price}",
                photoName = "${vecation.photoName}"
                WHERE vacationID = ${vecation.id};`;

    const info:OkPacket = await DataAccessLevel.execute(sql);


    
    return vecation
  

}





//conditions
async function GetVecatiosByFollow(user_id:number):Promise<vecationModel[]>{
        
        
    const sql  =  `SELECT vacationID as id, destination,description, startDate,endDate,price,photoName  FROM vacations v JOIN followers f ON f.vecation_id = v.vacationID WHERE f.user_id = ?;`;

    const response = await DataAccessLevel.execute(sql,[user_id]);
    
    

    return response

 

}
async function GetVecationsDontStart():Promise<vecationModel[]>{
        
    const currentDate = new Date().toISOString().slice(0, 10);
    
    const sql  =  `SELECT vacationID as id, destination,description, startDate,endDate,price,photoName  FROM vacations WHERE startDate >= "${currentDate}";`;

    const response = await DataAccessLevel.execute(sql);
    
    

    return response

 

}

async function GetActiveVecations():Promise<vecationModel[]>{
        
    const currentDate = new Date().toISOString().slice(0, 10);
    
    const sql  =  `SELECT vacationID as id, destination,description, startDate,endDate,price,photoName  FROM vacations WHERE startDate <= "${currentDate}" AND endDate >= "${currentDate}";`;

    const response = await DataAccessLevel.execute(sql);
    
    

    return response

 

}







export default{
    GetAllVecation,
    GetOneVecation,
    DeleteOneVecation,
    AddOneVaction,
    updateVecation,
    GetVecatiosByFollow,
    GetVecationsDontStart,
    GetActiveVecations
  
}