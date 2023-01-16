import { Tokens } from "ordercloud-javascript-sdk";
import { DecodedOCToken } from "../../models/profile";
import jwt_decode from "jwt-decode";
import { isUndefined } from "lodash";
import Cookies from "js-cookie";
import { parseJwt } from "../../utils/parseJwt";

export class TokenService {
    constructor(){

    }

    private accessTokenCookieName: string = "ordercloud.access-token";    

    setAccessTokenWithExpiry(token:string, expiresIn?: number):void{
        const decodedToken = parseJwt(token);        
        const expInDays = this.convertExpToDays(decodedToken.exp);        
        Cookies.set(this.accessTokenCookieName, token, { expires: expInDays });
    }

    isTokenExpired(token?: string): boolean  {
        if (!token) {
          token = Tokens.GetAccessToken();
        }
        if(!token)
            return true;
        const decodedToken = parseJwt(token);
        const currentSeconds = Date.now() / 1000;
        const currentSecondsWithBuffer = currentSeconds - 10;
        return decodedToken.exp < currentSecondsWithBuffer;
    }    

    getDecodedOCToken(): DecodedOCToken | null {        
        try{
            const accessToken = Tokens.GetAccessToken();
            if(accessToken){
                return jwt_decode(accessToken);
            }            
        }
        catch(err){
            console.log(err);            
        }
        return null;
    }

    getAnonymousOrderID():string | null | undefined {
        const token = this.getDecodedOCToken();
        return token ? token.orderid : null
    }

    isTokenAnonymous(): boolean {
        return !isUndefined(this.getAnonymousOrderID());
    } 
    
    private convertExpToDays(exp: number): number{        
        var expDate:Date = new Date(exp * 1000);
        var diff = Math.abs(expDate.getTime() - Date.now());
        return Math.ceil(diff / (1000 * 3600 * 24)); 
    }
}