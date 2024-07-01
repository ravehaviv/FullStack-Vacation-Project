import express, { Request, Response, json } from "express";
import expressFileUpload from "express-fileupload"
import users_route from "./6-controllers/users-controll";
import catchAll from "./3-middleware/catchAll";
import routeNotFound from "./3-middleware/RouteNotFound";
import vecation_route from "./6-controllers/vaction-controll";
import appConfig from "./2-utils/AppConfig";
import cors from "cors";
import followers_route  from "./6-controllers/followers-controller";


const server = express();

server.use(cors())

server.use(json());

server.use(expressFileUpload());

//users api 
server.use("/api",users_route);
server.use("/api",followers_route);
server.use("/api",vecation_route);



server.use("*",routeNotFound);

server.use(catchAll);




server.listen(appConfig.port,() => {

    console.log("listening on http://localhost:3001");
   
});