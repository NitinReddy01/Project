import { CorsOptions } from "cors";
import origins from "./origins";

const corsConfig:CorsOptions={
    origin:(origin,callback)=>{
        if(!origin || origins.indexOf(origin)!==-1){
            callback(null,true);
        }else{
            callback(new Error("Blocked by Cors"));
        }
    }
}
export default corsConfig;