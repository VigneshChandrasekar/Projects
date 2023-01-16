import useSWR from 'swr';
import Link from 'next/link';
import { SpecOption } from 'ordercloud-javascript-sdk';
import { ProductSpecs } from '../../models/productspecs.model';
import { ocAppConfig } from '../../../environments/environment.config';

type Props = {
    productIds: string[]    
};

const fetcher = async (url:string): Promise<ProductSpecs> => {
    const response = await fetch(url);
    var data = await response.json();    
    return data as ProductSpecs;
};

const ProductSpecFilters = ({ productIds }: Props) => {
    const { data, error } = useSWR(builApiUrl(productIds), fetcher);

    return(
        <>
        {data?.specs?.map((spec, index) => (
            <div className="col-sm-12" key={index}>
                <div className="side border mb-1">
                    <h3>{spec.Name}</h3>
                    {renderSpecOptions(spec.Name, spec.OptionCount, spec.Options)}
                </div>
            </div>
            ))}
        </>
    );
}

function renderSpecOptions(spectName?: string, optionCount?: number, options?: SpecOption[]){    
    if(optionCount && spectName && options){
        if(optionCount > 0){
            if(spectName.toLowerCase() == "size"){                
                return(
                    <div className="block-26 mb-2">
                        <ul className="product-filter-size">
                            {options.map((option, index) => (
                                <li key={index}>
                                    <Link href="/">{option.ID}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )
            }
            else{
                return(
                    <ul>
                        {options.map((option, index) => (
                            <li key={index}>
                                <Link href="/">{option.Value}</Link>
                            </li>
                        ))}
                    </ul>
                )
            }
        }
    }    
};

function builApiUrl(productIds:string[]): string{
    return ocAppConfig.nextPublicApiEndPoint + "/api/specs?productIds=" + productIds.join("|");    
};

export default ProductSpecFilters;