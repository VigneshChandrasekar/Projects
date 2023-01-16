import { AppConfig } from "../src/models/environment.config";

export const ocAppConfig: AppConfig = {
    appName: "Storefront",
    buyerClientID: process.env.NEXT_PUBLIC_BUYER_CLIENT_ID || "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL,
    baseAuthUrl: process.env.NEXT_PUBLIC_BASE_AUTH_URL,
    scopes: [
        "BuyerReader",
        "MeAddressAdmin",
		"MeAdmin",
		"MeCreditCardAdmin",
		"MeXpAdmin",
		"PasswordReset",
		"ProductAdmin",
		"ProductAssignmentAdmin",
		"ProductFacetReader",
		"ProductReader",
		"Shopper"],
    sdkConfiguration:{
        baseApiUrl: process.env.NEXT_PUBLIC_BASE_API_URL,
        clientID: process.env.NEXT_PUBLIC_BUYER_CLIENT_ID || "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
    },
    nextPublicApiEndPoint: process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:3000"
}