import {ReactNode, createContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import {auth} from '../services/firebase'

type AuthContextData = {
    signed: boolean;
    loadingAuth: boolean;
    handleInfoUser: ({uid, name, email}: UserProps) => void;
    user: UserProps | null;

}


type UserProps = {

    uid: string | null, 
    name: string | null,
    email: string | null
}


export const AuthContext = createContext({} as AuthContextData);
export const AuthProvider = ({children}: {children: ReactNode}) => {

    const [user, setUser] = useState <UserProps | null> (null);
    const [loadingAuth, setAuth] = useState(true);

    useEffect(() => {

       const authorided =  onAuthStateChanged( auth, (user) => {

        if(user) {
            // tem usuário logado
            setUser({
                uid: user.uid,
                name: user?.email,
                email: user?.displayName,
            })

            setAuth(false)

        } else {
            // Não tem user logado
            setUser(null)
            
            setAuth(false)
        }


       });

       return () => authorided();

    }, [])



    function handleInfoUser ({name, email, uid}: UserProps) {

        setUser({
            name, 
            email, 
            uid
        })
    }


    return (
        <AuthContext.Provider value={{
            signed: !!user, 
            loadingAuth,
            handleInfoUser,
            user
            }}>

            {children}    
        </AuthContext.Provider>
    )



}