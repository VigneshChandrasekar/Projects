import React from "react";
import { GetServerSideProps  } from "next";
import Layout from "../src/components/Layout/Layout";
import useProductList from "../src/hooks/use-productlists";
import { ProductList } from "../src/models/productlist.model";
import ProductCard from "../src/components/ProductCard/ProductCard";
import ProductSpecFilters from "../src/components/ProductSpecFilters/ProductSpecFilters";

type RouteInfo = {
    categoryL1: string,
    categoryL2?: string,
    isProductListingPage: boolean
}

const Category: React.FC<ProductList> = (productList: ProductList) => {
    return(
    <Layout title={productList.categoryName}>
        <div className="colorlib-product">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-xl-3">
                        <div className="row">
                            {renderProductSpecFiltersComponent(productList)}
                        </div>
                    </div>
                    <div className="col-lg-9 col-xl-9">
                        <div className="row row-pb-md">
                            {productList?.products?.map((product, index) => (
                                <ProductCard product={product} index={index} key={index}/>                            
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
    );
};

export const getServerSideProps:GetServerSideProps = async(context) => {                
    const category = context.params?.categories ? context.params?.categories.toString() : "";         
    const routeInfo = isProductListingPage(category);    
    if(routeInfo.isProductListingPage){
        const data = await useProductList(routeInfo.categoryL1, routeInfo.categoryL2);                
        if(!data || !data.products){
            return{            
                notFound: true            
            };
        }    
        return {props: data};
    }  
    return { notFound: true };      
};

function isProductListingPage(category: string): RouteInfo{    
    let routeInfo: RouteInfo = { categoryL1: "", isProductListingPage: false };    
    if(category){
        const routes: string[] = category.split(',');
        if(routes && routes.length && routes.length < 3){            
            if(routes.length === 1 && routes[0].endsWith("-list")){
                routeInfo.categoryL1 = routes[0].split("-list")[0];
                routeInfo.isProductListingPage = true;
            }
            else if(routes.length === 2){
                if(routes[1].endsWith("-list")){
                    routeInfo.categoryL1 = routes[0];
                    routeInfo.categoryL2 = routes[1].split("-list")[0];
                    routeInfo.isProductListingPage = true;
                }
            }
        }
    }
    return routeInfo;
}

function renderProductSpecFiltersComponent(productList: ProductList){
    if(productList && productList.products && productList.products.length){
        const productIds = productList.products.map(product => product.ID)?.join("|");        
        if(productIds){
            return(<ProductSpecFilters productIds={productIds.split("|")} />);
        }
    }
}

export default Category;