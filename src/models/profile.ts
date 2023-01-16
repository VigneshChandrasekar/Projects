import { ApiRole } from "ordercloud-javascript-sdk"
export interface DecodedOCToken{
    usr: string,
    cid: string,
    usrtype: 'admin' | 'buyer' | 'supplier',
    role: ApiRole[],        
    exp: number,    
    orderid?: string
}

export interface SiteContextUser {
    username?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    id?: string,
    isAnonUser: boolean   
}