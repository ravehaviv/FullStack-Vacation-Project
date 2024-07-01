import "./Login.css";
import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";
import  {TextField,Stack } from '@mui/material';
import authService from "../../../Service/authService";
import credentialModel from "../../../Models/credentialModel";
import notifyService from "../../../Service/NotifyService";




function Login(): JSX.Element {

    const {register, handleSubmit} = useForm<credentialModel>();
    const navigate = useNavigate()

   

    const save = async (credential:credentialModel) => {
      try{

          await authService.Login(credential);
          notifyService.success("Welcome Back!")
          navigate("/vecations");

      }catch(error:any){
        notifyService.error(error)
      }
    }


    return (
        <div className=" Login mainForm">
            <div className="formBox">
                <h1>Login</h1>
                <form onSubmit={handleSubmit(save)}>
                <Stack spacing={1} className="formm"  >
                
                    <TextField id="outlined-basic"  label="UserName" variant="outlined" {...register("userName")}/>
            
                    <TextField id="outlined-basic"   type = "password" label="password" variant="outlined" {...register("password")}/>
                    <br />
                    <button>Login</button>
                   
                </Stack>
                </form>
            </div>
        </div>
    );
}

export default Login;
