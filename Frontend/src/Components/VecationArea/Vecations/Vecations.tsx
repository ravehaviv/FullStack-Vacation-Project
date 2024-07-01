import { useEffect, useState } from "react";
import vecationModel from "../../../Models/VecationModel";
import "./Vecations.css";
import { RootState, store } from "../../../Redux/store";
import vecationService from "../../../Service/vecationService";
import VecationCard from "../VecationCard/VecationCard";
import { useSelector } from "react-redux";
import VecationCardAdmin from "../VecationCardAdmin/VecationCardAdmin";
import { useNavigate } from "react-router-dom";
import notifyService from "../../../Service/NotifyService";


function Vecations(): JSX.Element {

    const is_user = useSelector( (state:RootState) => state.user?.user?.userRole);
    const navigate =useNavigate();
    const [vecations, setVecations] = useState<vecationModel[]>([])
    const [add, setAdd] = useState<number>(10)


    store.subscribe(() => {
        vecationService.GetAllVecation()
            .then( v=> setVecations(v))
            .catch(e =>notifyService.error(e))
        
    })

    useEffect(() =>{

        if(!is_user)  navigate("/login");
        
        vecationService.GetAllVecation()
            .then( v=> setVecations(v))
            .catch(e => notifyService.error(e))

    },[])

    if (is_user === "admin") {
        return (
            <div className="Vecations">
                 {vecations.map(v => <VecationCardAdmin key={v.id} vecation={v} />)}  
                
            </div>
        )
    }else{
            return (
                <>
                    <div className="Vecations">

                        {vecations.slice(0,add).map(v => <VecationCard key={v.id} vecation={v} />)}

                    </div>
                    <div className="divButton">

                    <button className="AddButton" onClick={() => setAdd(add+10)}>Click Me For More</button>
                    </div>
                   
                </>
            );
        }
}

export default Vecations;
