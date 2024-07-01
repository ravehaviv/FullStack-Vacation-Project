import fsPromise from "fs/promises"


async function logger(msg:any):Promise<void>{

    const date = new Date();
    const now  = date.toLocaleString();
    let line = `${now}   ${msg?.message}, ${msg?.status} \n`;
    line += `----------------------- \n`;

    await fsPromise.appendFile("./src/1-assets/log.txt",line);

}

export default logger