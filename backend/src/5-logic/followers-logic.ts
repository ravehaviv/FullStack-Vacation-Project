import { OkPacket } from "mysql";
import DataAccessLevel from "../2-utils/DataAccessLevel";
import followersModel from "../4-models/followerModel";
import { ValidationError, followError } from "../4-models/errorModel";







async function GetFollowersById(Follow:followersModel):Promise<boolean>{


     const sql = `SELECT COUNT(*) as count FROM followers WHERE user_id = ? AND vecation_id =?;` ;
     const [rows] = await DataAccessLevel.execute(sql,[Follow.userID,Follow.vecation_id]);
     

    if(rows.count > 0 ){
         return true
    }
     
   
     return false
    
    
     
}



async function SaveFollow(Follow:followersModel):Promise<followersModel>{

    
    

    const error = Follow.validation()
    if(error) throw new ValidationError(error)

    const sqlCheck = `SELECT COUNT(*) as count FROM followers WHERE user_id = ? AND vecation_id =?;` 
    const [rows] = await DataAccessLevel.execute(sqlCheck,[Follow.userID,Follow.vecation_id]);
  
    
    if(rows.count) throw new followError();


    const sql = `INSERT INTO followers VALUES(?,?)`;

    const info:OkPacket = await DataAccessLevel.execute(sql,[Follow.userID,Follow.vecation_id]);

    
    return Follow
    
}

async function Unfollow(user_id:number,vecation_id:number):Promise<void>{

   

    const sql  =  `DELETE FROM followers WHERE user_id = ? AND vecation_id = ?`;
    
    const info:OkPacket = await DataAccessLevel.execute(sql,[user_id,vecation_id]);
    
 
    
}


async function GetCsv():Promise<any>{

    const sql  =  `
    SELECT v.destination, COUNT(f.vecation_id) AS "follow" 
    FROM vacations AS v 
    LEFT JOIN followers AS f
    ON v.vacationID = f.vecation_id GROUP BY v.destination
    ORDER BY follow ASC`;
    
    const data = await DataAccessLevel.execute(sql);


    return data;
    
    
}



export default{
    GetFollowersById,
    SaveFollow,
    Unfollow,
    GetCsv
}
