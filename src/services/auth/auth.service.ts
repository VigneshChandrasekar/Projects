import { 
    Auth, 
    Tokens, 
    AccessToken, 
    Configuration, 
    ApiRole, 
    Me,
    MeUser } from 'ordercloud-javascript-sdk';
import { ocAppConfig } from '../../../environments/environment.config';
import { tokenService } from '..';

export class AuthenticationService{      
    BuyerClientID:string;
    AnonymousBuyerScope: ApiRole[];
    IsLoggedIn: boolean = false;
    constructor(){        
        this.BuyerClientID = ocAppConfig.buyerClientID;
        
        //Updating Sdk configuration to use Anonymous Buyer for Shopping (Guest User)            
        Configuration.Set(ocAppConfig.sdkConfiguration);   
        this.AnonymousBuyerScope = ocAppConfig.scopes;                
    }

    //#region Guest User functions
    async anonymousLogin(): Promise<AccessToken>{        
        try{                        
            const anonToken = await this.getAnonymousToken(); 
            if(anonToken) {                
                if(anonToken.access_token){                    
                    tokenService.setAccessTokenWithExpiry(anonToken.access_token, anonToken.expires_in);
                }
                if(anonToken.refresh_token){
                    Tokens.SetRefreshToken(anonToken.refresh_token);
                }
            }
            return anonToken;
        }
        catch (err: any) {
            const retryLogin = !(err?.errors?.error === 'invalid_grant' && err?.errors?.error_description === 'Default context user required for client credentials grant') && err?.message !== 'Application has not been configured correctly, please check app config';
            this.logout(retryLogin);
            throw new Error(err);
          }
    }
    //#endregion    
    
    async getCurrentUser(): Promise<MeUser | null>{
        
        try{
            const user = await Me.Get();
            if(user){
                return user;
            }
        }
        catch(err){
            console.log(err);
        }

        return null;
    }

    //#region Private functions
    private async getAnonymousToken(): Promise<AccessToken>{
        if(this.BuyerClientID === 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'){
            throw new Error('Application has not been configured correctly, please check app config');            
        }        

        return await Auth.Anonymous(this.BuyerClientID, this.AnonymousBuyerScope);
    }

    private async logout(loginAnon: boolean): Promise<void>{
        Tokens.RemoveAccessToken();
        Tokens.RemoveRefreshToken();
        this.IsLoggedIn = false;
        if(loginAnon){
            await this.anonymousLogin();
        }
    }
    //#endregion    
}