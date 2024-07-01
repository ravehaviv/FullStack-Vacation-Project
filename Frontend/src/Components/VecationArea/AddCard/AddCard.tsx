import { useForm } from "react-hook-form";
import vecationModel from "../../../Models/VecationModel";
import  {TextField,Stack } from '@mui/material';
import notifyService from "../../../Service/NotifyService";
import vecationService from "../../../Service/vecationService";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";
import { useEffect } from "react";
import "./AddCard.css";

function AddCard(): JSX.Element {

    const{register,handleSubmit } = useForm<vecationModel>();
    const user = useSelector( (state:RootState) => state.user.user);
    const navigate =useNavigate();

    useEffect(() =>{
        if(user ){
            if(user.userRole !== "admin"){
                navigate("/vecations");
                notifyService.error("You do not have appropriate permission")
            }
             
        }if(!user){
            navigate("/login");
            notifyService.error("You Have To log in")
        }
    },[])

    const Add = async (vecation:vecationModel) => {
        try{
  
            await vecationService.AddVecation(vecation);
            notifyService.success("Added Successfull")
            navigate("/vecations");
  
        }catch(error:any){
          notifyService.error(error)
        }
      }
  

    return (
        <div className="AddCard mainForm ">
			<div className="formBox">
                <h1>Add</h1>
                <form onSubmit={handleSubmit(Add)}>

                        <Stack spacing={1} className="formm"  >
                            <TextField id="outlined-basic"  label="destination" variant="outlined"  {...register("destination")}/>
                            
                            <TextField id="outlined-basic"  label="description" variant="outlined" {...register("description")}/>
                        
                            <TextField id="outlined-basic" type="date"  label="startDate" variant="outlined" {...register("startDate")}/>

                            <TextField id="outlined-basic" type="date"  label="endDate" variant="outlined" {...register("endDate")}/>
                    
                            <TextField id="outlined-basic"   type = "number" label="price" variant="outlined" {...register("price")}/>

                            <TextField  id="outlined-basic"   type = "file" label="image" variant="outlined" {...register("image")} style={{width:"80%"}}/>
                            
                            <button>Add</button>
                        
                        </Stack>
                    

                </form>
           
            </div>
        </div>
    );
}

export default AddCard;
