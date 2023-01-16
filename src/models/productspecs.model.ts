import { Spec } from "ordercloud-javascript-sdk";

export interface ProductSpecs {
    specs?: Spec<any, HSSpecOptionXp>[],
    totalCount?: number,
    page?: number,
    totalPages?: number,
    pageSize?: number
}

export interface HSSpecOptionXp {
    hexColor: string
};