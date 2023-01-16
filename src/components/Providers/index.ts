import { Me } from "ordercloud-javascript-sdk";
import { SiteContextUser } from "../../models/profile";
import { ocBaseService } from "../../services";
import { tokenService } from "../../services";

const authenticateToOC = async (): Promise<SiteContextUser> => {            
    
    const guestUser:SiteContextUser = {
        username: "anonymous-shopper",
        firstName: "anonymous",
        lastName: "shopper",
        email: "fake@emai.com",
        isAnonUser: true
    };   

    try{   
        const authResponse = await ocBaseService.reAuthenticate();     
        if(authResponse.authenticated) {
            const isAnonUser = tokenService.isTokenAnonymous();            
            if(isAnonUser)                
                return guestUser;
            else{
                const meUser = await Me.Get();
                if(meUser){           
                    const contextUser:SiteContextUser = {
                        username: meUser.Username,
                        firstName: meUser.FirstName,
                        lastName: meUser.LastName,
                        email: meUser.Email,
                        isAnonUser: false
                    };                    
                    return contextUser;                       
                }
            }
        }        
    }
    catch(err){
        throw new Error("Authentication failed");
    }
    return guestUser; 
};

export { authenticateToOC };