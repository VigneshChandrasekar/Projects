import { DecodedToken } from "ordercloud-javascript-sdk";

function decodeBase64(str: string) {
    // atob is defined on the browser, in node we must use buffer
    if (typeof atob !== 'undefined') {
      return atob(str)
    }
    return Buffer.from(str, 'base64').toString('binary')
}

export function parseJwt(token: string): DecodedToken{
    try{
        const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      decodeBase64(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
    }
    catch(err){
        console.log(err);
        throw new Error("Invalid Token");        
    }
}