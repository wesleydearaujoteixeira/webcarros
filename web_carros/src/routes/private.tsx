import { ReactNode, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";


export function Private ({children}: {children: ReactNode}): any {

     const {signed,} = useContext(AuthContext);

     if(!signed) {
        return <Navigate to="/login" />
     }

    return children;


}