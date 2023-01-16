import { NextApiRequest, NextApiResponse } from "next";
import { productListService } from "../../src/services";
import { ProductSpecs } from "../../src/models/productspecs.model";
import { ListPage, Spec, SpecOption } from "ordercloud-javascript-sdk";
import { HSSpecOptionXp } from "../../src/models/productspecs.model";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ProductSpecs>
){    
    let productSpecs: ProductSpecs = {};    
    if(req.query.productIds && typeof req.query.productIds === "string"){        
        let productIds: string[] = req.query.productIds.split("|");
        if(productIds && productIds.length){
            const fetchResponse = await productListService.fetchSpecs(productIds);
            if(fetchResponse && fetchResponse.Items){
                productSpecs = {
                    specs: mergeSpecs(fetchResponse.Items),
                    totalCount: fetchResponse.Meta?.TotalCount,
                    page: fetchResponse.Meta?.Page,
                    totalPages: fetchResponse.Meta?.TotalPages,
                    pageSize: fetchResponse.Meta?.PageSize
                };
                res.status(200).json(productSpecs);
            }            
        }        
    }
    res.status(401).json(productSpecs);
}

function mergeSpecs(items: Spec<any, any>[]) : Spec<any, HSSpecOptionXp>[]{
    let specs: Spec<any, HSSpecOptionXp>[] = [];
    if(items && items.length){
        items.map((item, index) => {
            const specIndex = specs.findIndex(spec => spec.Name === item.Name);         
            if(specIndex > -1){
                let options = specs[specIndex].Options;                
                let options1 = options ? options : [];               
                let options2 = item.Options as SpecOption<HSSpecOptionXp>[];                  
                if(options2 && options2.length){                          
                    options2.forEach((op, index2) => {                    
                        const opIndex = options1.findIndex(o => o.ID === op.ID);                     
                        if(opIndex < 0){                        
                            options1.push(op);                        
                        }
                    });                    
                }                
            }
            else{
                specs.push(item);
            }
        });              
    }
    console.log(specs);
    return specs;
}