import { Request } from "express";
import userModel from "../4-models/userModel";
import jwt from "jsonwebtoken"
import roleModle from "../4-models/roleModel";
import crypto from "crypto";


const salt = "MakeThingsGoRight"
const secretKey = "bananaMelon345678"

function createToken(user:userModel):string{

    delete user.password;
    
    const container = {user};

    const options = {expiresIn: "3h"}

    const token = jwt.sign(container ,secretKey,options);

    return token;


}

function validateToken(request:Request):Promise<boolean>{

    return new Promise<boolean>((resolve, reject) => {
        try{

            const header = request.header("authorization");
            if(!header) {
                resolve(false)
                return;
            };

            const token = header.substring(7);

            if (!token){

                resolve(false);
                return;
            };

            jwt.verify(token,secretKey, err => {

                if(err) {
                    resolve(false);
                    return;
                }
                
                resolve(true)
        })



        }catch(err:any){
            reject(err);
        }

    })
}

async function verifyAdmin(req:Request):Promise<boolean>{

    const check_if_login = await validateToken(req);

    if(!check_if_login) return false;

    const header = req.header("authorization")
    const token =  header.substring(7);

    const container:any = jwt.decode(token);
    const user:userModel = container.user;

    if(user.userRole === roleModle.admin) return true;

    return false
}





function hash(plainText:string):string {

    if(!plainText) return null

    const hashedText = crypto.createHmac("sha512",salt).update(plainText).digest("hex")
 
    return hashedText

}


export default {
    createToken,
    validateToken,
    verifyAdmin,
    hash,
    
}