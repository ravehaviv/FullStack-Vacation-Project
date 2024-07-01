import axios from "axios";
import userModel from "../Models/userModel";
import appConfig from "../Utils/appConfig";
import { store } from "../Redux/store";
import { login, logout, register } from "../Redux/userSlice";
import credentialModel from "../Models/credentialModel";


class AuthService{

    public async Register(user:userModel):Promise<void>{

        const response = await axios.post<string>(appConfig.registerUrl,user);

        const token = response.data
       
        

        store.dispatch(register(token))
    }

    public async Login(user:credentialModel):Promise<void>{

        const response = await axios.post<string>(appConfig.loginUrl,user);

        const token = response.data

        store.dispatch(login(token))
    }

    public Logout():void{
        store.dispatch(logout())
    }
}

const authService = new AuthService();
export default authService;