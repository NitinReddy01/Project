import axios from "../Api/axios";
import { useAuth } from "./useAuth"


const useRefreshToken = ()=>{
    const {setAuth,auth} = useAuth();
    const refresh = async ()=>{
        const res=await axios.get('/auth/refreshToken');
        setAuth({...auth!,accessToken:res.data.accessToken});
        // console.log("use Refresh hook");
        return res.data.accessToken;
    }
    return refresh;
}
export default useRefreshToken;