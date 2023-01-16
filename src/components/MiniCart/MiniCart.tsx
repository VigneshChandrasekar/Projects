import Link from "next/link";

export default function MiniCart(){
    return(
        <li className="cart">
            <Link href="/" key="mini-cart">
                <i className="icon-shopping-cart"></i>
                [0]
            </Link>
        </li>
    );
};