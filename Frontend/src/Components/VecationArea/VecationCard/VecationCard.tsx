import vecationModel from "../../../Models/VecationModel";
import appConfig from "../../../Utils/appConfig";
import "./VecationCard.css";

import FormControlLabel from "@mui/material/FormControlLabel";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Checkbox from "@mui/material/Checkbox";
import { ChangeEvent, useEffect, useState } from "react";

import followerService from "../../../Service/followerService";
import notifyService from "../../../Service/NotifyService";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";
    





interface VecationCardProps {
	vecation:vecationModel
}


function VecationCard(props: VecationCardProps): JSX.Element {

    const [isfollow ,setIsfollow] = useState<boolean>(false);
    const [count ,Setcount] = useState<any>([]);

    const user_id = useSelector( (state:RootState) => +state.user.user.userID);
    
    
  
    useEffect( () => {
  
        
        followerService.GetAllFollow(props.vecation.id,user_id)
            .then( v=> setIsfollow(v))
            .catch(e => notifyService.error(e))

         followerService.GetCsv()
         .then((c) => {
            const d:any = c.find((v:any) => v?.destination === props.vecation.destination)
            Setcount(d?.follow);
            
         })
         .catch(e => notifyService.error(e))


    },[])

    
    
    const like = async (e:ChangeEvent<HTMLInputElement> ,vecation_id:number) => {

        try {         
            
            if(e.target.checked === true) {
                
                setIsfollow(true)
                Setcount(count + 1 )
                await followerService.AddFollow(+vecation_id,user_id)
            }else{
                setIsfollow(false)
                Setcount(count - 1 )
                await followerService.unfollow(vecation_id,user_id)
            }
        } catch (error:any) {
            notifyService.error(error.message)
        }
        
    
        
    }
    return (
        <div className="VecationCard" >
            <div>
             
                <div className="ImageCard" style={{backgroundImage:`url(${appConfig.ImageVecationUrl + props.vecation.photoName})`}}></div>
                <h1>{props.vecation.destination}</h1>
                <span>{props.vecation.description}</span>
                <br />
                <span>From: {props.vecation.startDate}</span>
                <br />
                <span>To: {props.vecation.endDate}</span>
                <br />
                <span>Price: {props.vecation.price}</span>
        
                <br />
                <div className="likeButton" style = {{ padding: "10px" ,position:"relative",bottom:"10px"}}>
          
                    <FormControlLabel
                        control = {
                            <Checkbox checked={isfollow} onChange={e =>like(e,+props.vecation.id)   }
                            icon = {<FavoriteBorderIcon />}
                            checkedIcon = {<FavoriteIcon style={{color:"red"}} />}
                            />
                            }
                        label ={`Like ${count}`}
                     />
                </div>

            </div>

        </div>
    );
}

export default VecationCard;
