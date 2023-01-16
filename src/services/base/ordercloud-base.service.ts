import { Tokens, Configuration } from 'ordercloud-javascript-sdk';
import { tokenService } from '..';
import { authService } from '..';
import { ocAppConfig } from '../../../environments/environment.config';

type AuthResponse = {
    authenticated: boolean,
    accessToken?: string
}

export class OrderCloudBaseService {         
    constructor(){
        Configuration.Set(ocAppConfig.sdkConfiguration);               
    }

    async reAuthenticate():Promise<AuthResponse> {
        var tokenExpired: boolean = tokenService.isTokenExpired();
        var authResponse: AuthResponse = {
            authenticated: !tokenExpired,
            accessToken: Tokens.GetAccessToken()
        };                    
        if(tokenExpired){            
            const anonToken = await authService.anonymousLogin();
            if(anonToken){                    
                authResponse.accessToken = anonToken.access_token;
                authResponse.authenticated = true;                                                                     
            }
        }        
        return authResponse;
    };
};