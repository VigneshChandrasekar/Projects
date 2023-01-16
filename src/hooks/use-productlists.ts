import { ProductList } from '../models/productlist.model';
import { ocAppConfig } from '../../environments/environment.config';

export default async function useProductList(category1:string, category2?: string){        
    const url = builApiUrl(category1, category2);
    const response = await fetch(url);    
    var data = await response.json();
    return data as ProductList;
};

function builApiUrl(category1:string, category2?: string): string{
    var url = ocAppConfig.nextPublicApiEndPoint + "/api/products?parentcategory=" + category1;
    if(category2){
        url += "&childcategory=" + category2;
    }
    return url;
}