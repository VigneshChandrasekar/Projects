import { BuyerProduct, ListFacet } from "ordercloud-javascript-sdk";
import { HSXpImage } from "./xpimage.model";

export interface ProductList{
    products?: BuyerProduct<HSBuyerProductXp, any>[],
    facets?: ListFacet[],
    totalCount?: number,
    page?: number,
    totalPages?: number,
    pageSize?: number,
    categoryName?: string
};

export interface HSBuyerProductXp {
    Price: number,
    Images: HSXpImage[],
    PriceCurrency: string
};
