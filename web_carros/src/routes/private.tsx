import { ReactNode, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";


export function Private ({children}: {children: ReactNode}): any {

     const {signed, setAuth} = useContext(AuthContext);

  
     if(!signed) {
        setAuth(false)
        return <Navigate to="/login" />
     }

    setAuth(true)
    return children;


}