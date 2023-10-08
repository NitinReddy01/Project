import { Context, Dispatch, ReactElement, ReactNode, SetStateAction, createContext, useState } from 'react'

interface User {
    username: string;
    accessToken: string;
}
type UserProviderProps = {
    children: ReactNode;
}
interface ContextType{
    auth:User | undefined;
    setAuth:Dispatch<SetStateAction<User | undefined>>
}
const defaultContext:ContextType={
    auth:undefined,
    setAuth:()=>{}
}
const UserContext: Context<ContextType> = createContext(defaultContext);

export const UserProvider = ({ children }: UserProviderProps):ReactElement => {
    const [auth,setAuth] = useState<User>();
    return (
        <UserContext.Provider value={{auth,setAuth}} >
            {children}
        </UserContext.Provider>
    );
}

export default UserContext;
