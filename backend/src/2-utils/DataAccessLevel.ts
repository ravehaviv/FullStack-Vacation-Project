import mysql from "mysql"
import appConfig from "./AppConfig"


//create pool - connection to database

const connection = mysql.createPool({

    host:appConfig.host,
    password:appConfig.password,
    database:appConfig.database,
    user:appConfig.user
});

//call promise  by sql
function execute(sql: string ,values?:any[]): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        connection.query(sql,values, (err, result)=>{
            if(err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}

export default {
    execute
};

