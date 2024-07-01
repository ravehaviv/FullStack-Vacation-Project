import axios from "axios";
import followersModel from "../Models/followerModel";
import appConfig from "../Utils/appConfig";




class FollowerService{

    

    public async GetAllFollow(vecation_id:number,user_id:number):Promise<boolean>{



        const response = await axios.get<boolean>(appConfig.followersUrl+`${user_id}/${vecation_id}`);

        return response.data

 
 
        
    }
    public async GetCsv():Promise<[]>{


        const response = await axios.get<[]>(appConfig.followersUrl+"csv");

        return response.data
 
        
    }

    
    public async AddFollow(vecation_id:number,user_id:number):Promise<void>{


        const follow = new followersModel
        follow.userID = user_id
        follow.vecation_id = vecation_id
        

        
        await axios.post<followersModel>(appConfig.followersUrl, follow);
       
        
    }



    public async unfollow(vecation_id:number,user_id:number):Promise<void>{ 

        
        await axios.delete(appConfig.followersUrl+`${user_id}/${vecation_id}`);
       
    }
}


const followerService = new FollowerService();
export default followerService;