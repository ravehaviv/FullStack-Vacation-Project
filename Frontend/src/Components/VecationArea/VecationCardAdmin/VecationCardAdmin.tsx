import vecationModel from "../../../Models/VecationModel";
import vecationService from "../../../Service/vecationService";
import appConfig from "../../../Utils/appConfig";
import "./VecationCardAdmin.css";
import { Link } from "react-router-dom";


interface VecationCardProps {
	vecation:vecationModel
}


function VecationCardAdmin(props: VecationCardProps): JSX.Element {


    
    const Delete = async (e:any,id:number) => {
        try{
    
            await vecationService.DeleteVaction(+id); 
       
    
        }catch(error:any){
            alert(error)
        }
    }
    return (
        <div className="VecationCard" >
        <div>
            <div className="ImageCard" style={{backgroundImage:`url(${appConfig.ImageVecationUrl+props.vecation.photoName})`}}></div>
            <h1>{props.vecation.destination}</h1>
            <span>{props.vecation.description}</span>
            <br />
            <span>From: {props.vecation.startDate}</span>
            <br />
            <span>To: {props.vecation.endDate}</span>
            <br />
            <span>Price: {props.vecation.price}</span>
            <br />
            <div className="controllEdit">
                <Link to={`/vacation/edit/`+props.vecation.id}>✏️</Link>  <button style={{background:""}} onClick={(e) =>Delete(e,props.vecation.id) }>🗑️</button>
            </div>
            
            

        </div>

    </div>
    );
}

export default VecationCardAdmin;
