import { BuyerProduct } from "ordercloud-javascript-sdk";
import Link from 'next/link';
import Image from 'next/image'
import { HSBuyerProductXp } from "../../models/productlist.model";
import * as _productCard from '../ProductCard';

type Props = {
    product: BuyerProduct<HSBuyerProductXp, any>,
    index: number
};

const ProductCard = ({    
    product,
    index
}: Props) => (
    <div className="col-lg-4 mb-4 text-center" key={index}>
        <div className="product-entry border">
            <Link href="/" className="prod-img">
                <Image src={_productCard.getDefaultProductImage(product.xp?.Images)} 
                alt="product image" className="img-fluid" width={250} height={250}></Image>
            </Link>
            <div className="desc">
                <h2>
                    <Link href="/">
                        {product.Name}
                    </Link>
                </h2>
                <span className="price">
                    {_productCard.getPrice(product?.xp?.Price, product?.xp?.PriceCurrency)}
                </span>
            </div>                
        </div>
    </div>
);

export default ProductCard;