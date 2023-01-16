import Link from "next/link";

export default function Logo(){
    return(
        <div className="col-sm-7 col-md-9">
            <div id="colorlib-logo">
                <Link href="/">Storefront</Link>
            </div>
        </div>
    );
};