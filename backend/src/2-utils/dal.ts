import fsPromise from "fs/promises"
import userModel from "../4-models/userModel";
import vecationModel from "../4-models/vecationModel";


const usersPath = "./src/1-assets/users.json"
const vecationPath = "./src/1-assets/vecation.json"

async function GetAllUsers():Promise<userModel[]>{

    const data = await fsPromise.readFile(usersPath,"utf-8");
    const users = JSON.parse(data);
    return users

}

async function SaveAllUsers(users:userModel[]):Promise<void>{

    const data = JSON.stringify(users,null,4);
    await fsPromise.writeFile(usersPath,data);

}

 async function GetAllVecations():Promise<vecationModel[]>{

        const data = await fsPromise.readFile(vecationPath,"utf-8");
        const vecations = JSON.parse(data);
        return vecations
    
}

async function SaveAllVecations(vecations:vecationModel[]):Promise<void>{

    const data = JSON.stringify(vecations,null,4);
    await fsPromise.writeFile(vecationPath,data);

}







export default{

    GetAllUsers,
    SaveAllUsers,
    GetAllVecations,
    SaveAllVecations
}

