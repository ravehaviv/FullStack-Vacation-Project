import  axios  from "axios";
import vecationModel from "../Models/VecationModel";
import { store } from "../Redux/store";
import appConfig from "../Utils/appConfig";
import { DeleteAllVecations, addVecation, deleteVecation, fetchVecations, updateVecation } from "../Redux/vecationSlice";


class VecationService{

    public async GetAllVecation():Promise<vecationModel[]>{
  

        let vecations  = store.getState().vecation.vecations;

        if(!vecations.length){

            const response = await axios.get<vecationModel[]>(appConfig.vecationUrl);
                
            vecations = response.data

            store.dispatch(fetchVecations(vecations))
        }

        return vecations;
    }

    public async DeleteVaction(id:number):Promise<void>{
  
    
        store.dispatch(deleteVecation(id))

        await axios.delete(appConfig.vecationUrl+id);
               
        

       
    }

    public  async GetOneVecation(id:number):Promise<vecationModel>{
  

        let vacations  = store.getState().vecation.vecations;
        
                
       const index = vacations.findIndex(v => v.id === id )
       
        return vacations[index]
       
    }


    
    public async AddVecation(vecation:vecationModel):Promise<void>{

        const myData = new FormData;

        myData.append("destination",vecation.destination);
        myData.append("description",vecation.description);
        myData.append("startDate",vecation.startDate.toString() );
        myData.append("endDate",vecation.endDate.toString() );
        myData.append("price",vecation.price.toString());
        myData.append("image",vecation.image[0]);

    
        const response = await axios.post<vecationModel>( appConfig.vecationUrl, myData );
       
        const vec = response.data

        store.dispatch(addVecation(vec))
    }


    public async updateVacation(vecation:vecationModel):Promise<void>{


       
        
        const myData = new FormData;
        
        

        myData.append("destination",vecation.destination);
        myData.append("description",vecation.description);
        myData.append("startDate",vecation.startDate.toString() );
        myData.append("endDate",vecation.endDate.toString() );
        myData.append("price",vecation.price.toString());
        if(vecation.image)
        myData.append("image",vecation?.image[0]);
    
        
        
    
        const response = await axios.put<vecationModel>( appConfig.vecationUrl + vecation.id, myData );
        
        store.dispatch(updateVecation(response.data));
       
        
    }

    public async GetVecationByFollow(userID:number):Promise<void>{
  

            const response = await axios.get<vecationModel[]>(appConfig.conditionsUrl+`byuser/`+userID);
        
                
            store.dispatch(fetchVecations(response.data))
            
        
        
    }
    public async GetVecationsDontStart():Promise<void>{
  

            const response = await axios.get<vecationModel[]>(appConfig.conditionsUrl+"dontstart");
                
        

            store.dispatch(fetchVecations(response.data))
        
        
    }
    public async GetActiveVecations():Promise<void>{
  

            const response = await axios.get<vecationModel[]>(appConfig.conditionsUrl+"between");
                

            store.dispatch(fetchVecations(response.data))
        
        
    }

    public async deleteStore():Promise<void>{
 
            store.dispatch(DeleteAllVecations())
        
    }



}



const vecationService = new VecationService()
export default vecationService;