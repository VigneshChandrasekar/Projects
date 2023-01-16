import { ApiRole, SdkConfiguration } from "ordercloud-javascript-sdk";

export interface AppConfig{
    appName: string,
    buyerClientID: string,
    baseUrl?: string,
    baseAuthUrl?: string,
    scopes: ApiRole[],
    sdkConfiguration: SdkConfiguration,
    nextPublicApiEndPoint: string
}