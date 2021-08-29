import React, { createContext, useContext, useEffect, useState } from 'react'
import { useForceUpdate } from '../components/Admin/Pages/AdminProducts/AdminProducts';

const AuthContext = createContext();
export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({children}) {    
    
    const forceUpdate = useForceUpdate()
    const [loggedInUser, setLoggedInUser] = useState();
    const [loading, setLoading] = useState(true);

    function signInWithEmail(user){
        console.log(user)
        let currentUser = {
            uid: user.userInfo.uid,
            name: user.userInfo.name,
            email: user.userInfo.email
        }
        setLoggedInUser(currentUser)
        localStorage.setItem('user', JSON.stringify(user))
    }

    function logout(){
        localStorage.removeItem('user')
        setLoggedInUser(null)
        forceUpdate()
    }

    useEffect(() => {
        let currentUser;
        setLoading(true)
        const user = JSON.parse(localStorage.getItem('user'))
        if(user){
            currentUser = {
                uid: user.userInfo.uid,
                name: user.userInfo.name,
                email: user.userInfo.email,
            }
            setLoggedInUser(currentUser);
            setLoading(false);
        }
        else{
            setLoggedInUser(null)
        }
        setLoading(false);
    },[])

    const value = {
        loggedInUser,logout, signInWithEmail,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
