import "./VecationCardEdit.css";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import vecationModel from "../../../Models/VecationModel";
import vecationService from "../../../Service/vecationService";
import  {TextField,Stack } from '@mui/material';
import notifyService from "../../../Service/NotifyService";
import appConfig from "../../../Utils/appConfig";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";


function VecationCardEdit(): JSX.Element {

    const{register,handleSubmit,setValue } = useForm<vecationModel>();
    const user = useSelector( (state:RootState) => state.user.user);

    const params =useParams();
    const [img , setImg] = useState<any>()
    const navigate =useNavigate();
    

    useEffect(() => {

        if(user ){
            if(user.userRole !== "admin"){
                navigate("/vecations");
                notifyService.error("You do not have appropriate permission")
            }
             
        }if(!user){
            navigate("/login");
            notifyService.error("You Have To log in")
        }

        

        const { id } = params;
        
        vecationService.GetOneVecation(+id)
        .then(v => {
            setValue("destination",v.destination);
            setValue("id",v.id);
            setValue("description",v.description);
            setValue("startDate",v.startDate);
            setValue("endDate",v.endDate);
            setValue("price",v.price);
            setValue("image",v.image);   
            setImg(v.photoName)
            
            
           
        })
        .catch(e => notifyService.error(e))

    },[])




    const Update = async (vecation:vecationModel) =>{
        try {
            
    
            
            await vecationService.updateVacation(vecation)
            navigate("/vecations");
            
        } catch (error:any) {
           
            
            notifyService.error(error)
        }
    }




    return (
        <div className="VecationCardEdit mainForm ">
			<div className="formBox">
                <h1>Edit</h1>
                <form onSubmit={handleSubmit(Update)}>

                        <Stack spacing={1} className="formm"  >
                            <TextField id="outlined-basic"  label="destination" variant="outlined"  {...register("destination")}/>
                            
                            <TextField id="outlined-basic"  label="description" variant="outlined" {...register("description")}/>
                        
                            <TextField id="outlined-basic" type="date"  label="startDate" variant="outlined" {...register("startDate")}/>

                            <TextField id="outlined-basic" type="date"  label="endDate" variant="outlined" {...register("endDate")}/>
                    
                            <TextField id="outlined-basic"   type = "number" label="price" variant="outlined" {...register("price")}/>

                            <TextField  id="outlined-basic"  type = "file" label="image" variant="outlined" {...register("image")} style={{width:"80%"}}/>
                            
                            <button>Update</button>
                           <img className="ImageEdit" src={appConfig.ImageVecationUrl + img } alt="" style={{height:"50px",width:"50px"}}/>
                          
                        
                        </Stack>
                    

                </form>
           
            </div>
        </div>
    );
}

export default VecationCardEdit;
