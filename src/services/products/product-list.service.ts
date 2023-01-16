import { OrderCloudBaseService } from "../base/ordercloud-base.service";
import { Me, ListPageWithFacets, BuyerProduct, Tokens, ListPage, Spec } from "ordercloud-javascript-sdk";
import { Specs, Filters } from "ordercloud-javascript-sdk";

type ProductListRequest = {
    categoryL1: string,
    categoryL2: string
}

export class ProductListService extends OrderCloudBaseService{
    constructor(){
        super();
    }

    listProducts = async(req: ProductListRequest):Promise<ListPageWithFacets<BuyerProduct> | null> => {        
        try{     
            const authResponse = await this.reAuthenticate();
            
            if(authResponse.authenticated){                  
                const allCategories = await Me.ListCategories({ searchOn: ["ID"], search: req.categoryL1 + "*", depth: "2" }, { accessToken: authResponse.accessToken });                                
                if(allCategories && allCategories.Items){
                    const parentCategory = allCategories.Items.filter(c => c.Name.toLowerCase() === req.categoryL1.toLowerCase());
                    if(parentCategory && parentCategory.length && parentCategory[0].ChildCount > 0){
                        let categoryID = parentCategory[0].ID;
                        if(req.categoryL2){
                            const childCategory = allCategories.Items.filter(c => c.ParentID === categoryID && c.Name.toLowerCase() === req.categoryL2.toLowerCase());
                            if(childCategory && childCategory.length){
                                categoryID = childCategory[0].ID;
                            }
                        }                        
                        var products = await Me.ListProducts({ categoryID: categoryID }, { accessToken: authResponse.accessToken });   
                        return products;
                    }
                }                
            }                
        }
        catch(err){
            console.log(err);            
        }
        return null;        
    };    

    fetchSpecs = async(productIds: string[]): Promise<ListPage<Spec<any, any>> | null> => {
        try{     
            const authResponse = await this.reAuthenticate();
            
            if(authResponse.authenticated){                  
                let filters: Filters = {
                    "ProductID": productIds.join("|")
                };                                
                const productAssignments = await Specs.ListProductAssignments(
                { filters: filters }, { accessToken: authResponse.accessToken });
               if(productAssignments && productAssignments.Items){
                    const specs = productAssignments.Items
                    .map(item => item.SpecID)
                    .filter((spectID, index, arr) => arr.findIndex(i => i === spectID));
                    if(specs && specs.length){
                        let filters2: Filters = {
                            "ID": specs.join("|")
                        };
                        const specsWithOptions = await Specs.List({
                            filters: filters2
                        }, { accessToken: authResponse.accessToken });
                        if(specsWithOptions && specsWithOptions.Items){
                            return specsWithOptions;
                        }
                    }
               }
            }                
        }
        catch(err){
            console.log(err);            
        }
        return null;
    };
};