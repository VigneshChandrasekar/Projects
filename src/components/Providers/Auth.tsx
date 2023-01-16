import React, { useState, useEffect, useContext } from "react";
import { SiteContextUser } from "../../models/profile";
import * as _authProvider from '../Providers';

const AuthContext = React.createContext<{ user: SiteContextUser | null }>({
    user: null
});

export function AuthProvider({ children }: any){
    const [user, setUser] = useState<SiteContextUser | null>(null);    
    useEffect(() => {                                          
        const login = async() => {
            const meUser = await _authProvider.authenticateToOC();
            setUser(meUser);
        };
        if(!user){                          
            login();
        }        
      });

    return (
        <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};