import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import userToken from "../2-utils/userToken";
import credencialModel from "../4-models/credencialModel";
import { validationErrorModel } from "../4-models/errorModel";
import roleModle from "../4-models/roleModel";
import userModel from "../4-models/userModel";
import DataAccessLevel from "../2-utils/DataAccessLevel";


async function register(user:userModel):Promise<string>{

    //validation 
     const error = user.validation();
     if(error) throw new validationErrorModel(error);

    if (await isUsernameTaken(user.userName)) throw new validationErrorModel(`Username ${user.userName} already taken`);
    
    
    user.password =  userToken.hash(user.password)
     const sql =
      `INSERT INTO users (userID , firstName, lastName, userName, password, userRole) VALUES
     (DEFAULT,?, ?, ?, ?, ?)`;
    
    //  const sql = `INSERT INTO users VALUES(DEFAULT ,?,?,?,?,?)`;

     const info:OkPacket = await DataAccessLevel.execute(sql,[user.firstName,user.lastName,user.userName,user.password,user.userRole = roleModle.user]);

  
    
    //  const info:OkPacket = await DataAccessLevel.execute(sql);
     
     user.userID = info.insertId;

    //get token 
        const token = userToken.createToken(user);

    //return token

    return token
    

    
}

async function login(credencial:credencialModel):Promise<string>{

    //validation 
    const err = credencial.validtion()
    if(err) throw new validationErrorModel(err)

    credencial.password =  userToken.hash(credencial.password)
   
     
    const sql = `SELECT userID , firstName,lastName,userName,password,userRole FROM users
                 WHERE userName = ? AND password = ?`;

    const response = await DataAccessLevel.execute(sql,[credencial.userName,credencial.password]);

    
    const user = response[0];
    
    
   
    
    
    if(!user){

     throw new validationErrorModel("username or password are incorrect");

    }
    //create token
    const token = userToken.createToken(user);

    return token 

}

async function isUsernameTaken(username: string): Promise<boolean> {
    
    
    const sql = `SELECT COUNT(*) AS count FROM users WHERE username = ?`;
    
    const [rows] = await DataAccessLevel.execute(sql,[username]);
    
    
    return rows.count > 0;  
  
}


export default{
    register,
    login,
    isUsernameTaken
}