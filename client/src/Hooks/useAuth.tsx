import { useContext,Dispatch,SetStateAction } from "react"
import UserContext from "../Context/UserProvider"

interface User {
    username: string;
    accessToken: string;
}

interface AuthType{
    auth:User | undefined;
    setAuth:Dispatch<SetStateAction<User | undefined>>
}

export const useAuth=():AuthType=>{
    return useContext(UserContext);
}
