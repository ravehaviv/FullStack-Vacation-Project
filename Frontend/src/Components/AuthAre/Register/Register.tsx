import "./Register.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import  {TextField,Stack } from '@mui/material';
import userModel from "../../../Models/userModel";
import authService from "../../../Service/authService";
import notifyService from "../../../Service/NotifyService";

function Register(): JSX.Element {

    const {register,handleSubmit} = useForm<userModel>()
    const navigate = useNavigate()

    const save = async (register:userModel) => {
        
        try {
            
            await authService.Register(register);
            navigate("/vecations");

         }catch(error:any){
        notifyService.error(error)
      }
    }

    return (
        <div className="Register mainForm">
            <div className="formBox">
                <h1>Register</h1>
                <form onSubmit={handleSubmit(save)}>
                <Stack spacing={1} className="formm"  >
                    <TextField id="outlined-basic"  label="First Name" variant="outlined"  {...register("firstName")}/>
                    
                    <TextField id="outlined-basic"  label="Last Name" variant="outlined" {...register("lastName")}/>
                
                    <TextField id="outlined-basic"  label="User Name" variant="outlined" {...register("userName")}/>
            
                    <TextField id="outlined-basic"   type = "password" label="password" variant="outlined" {...register("password")}/>
                    <br />
                    <button>Register</button>
                   
                </Stack>
                </form>
            </div>
        </div>
    );
}

export default Register;
