import axios from "axios";
import { store } from "../Redux/store";

class InterceptorsService{

    public createInterceptor():void{

        axios.interceptors.request.use((req) => {

            const token = store.getState().user.token;

            if(token){
                req.headers.Authorization = "Bearer " + token
            }


            return req

        })
    }
}

const interceptorsService = new InterceptorsService();
export default interceptorsService;