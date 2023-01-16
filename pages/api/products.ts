import { NextApiRequest, NextApiResponse } from "next/types";
import { productListService } from "../../src/services";
import { ProductList } from "../../src/models/productlist.model";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ProductList>
) {        
    let productList: ProductList = {};

    var categoryL1:string = req.query.parentcategory ? req.query.parentcategory.toString() : "";
    var categoryL2:string = req.query.childcategory ? req.query.childcategory.toString() : "";    

    const fetchResponse = await productListService.listProducts({
        categoryL1: categoryL1,
        categoryL2: categoryL2
    }); 

    if(fetchResponse && fetchResponse.Items){                
        productList = {
            products: fetchResponse.Items,
            facets: fetchResponse.Meta?.Facets,
            totalCount: fetchResponse.Meta?.TotalCount,
            page: fetchResponse.Meta?.Page,
            totalPages: fetchResponse.Meta?.TotalPages,
            pageSize: fetchResponse.Meta?.PageSize,
            categoryName: categoryL2 ? categoryL2 : categoryL1
        };        
    } 
        
    res.status(200).json(productList);
}