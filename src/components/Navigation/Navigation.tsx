import React, { useState, useEffect } from "react";
import Router from 'next/router';
import Link from 'next/link';
import useSwr from 'swr';
import * as _nav from '../Navigation';
import MiniCart from "../MiniCart/MiniCart";
import { SubMenuLink } from "../../models/navigation.linklist";

export default function Navigation(){
    const [activeIndex, setActiveIndex] = useState(-1);    
    const { data, error } = useSwr('/api/navigation/linklist', _nav.fetcher);

    useEffect(() => {
        const handleRouteChange = (url:string) => {
            let defaultActiveIndex:number = -1;
            const newActiveIndex = data?.Links?.findIndex(link => link.url == url);
            if(newActiveIndex)
                defaultActiveIndex = newActiveIndex

            setActiveIndex(defaultActiveIndex);
        };

        Router.events.on('routeChangeComplete', handleRouteChange);
    }, [data?.Links]);

    return (
        <div className="col-sm-12 text-left menu-1">
            <ul>
                {data?.Links?.map((link, index) => (                            
                    <li className={_nav.getClassName(link, activeIndex, index)} key={index}>
                        <Link href={link.url}>
                            {link.linkText}
                        </Link>               
                        {renderSubMenuLinks(link.hasSubMenu, link.subMenuLinks)}         
                </li>                                                                
                ))}
                <MiniCart />
            </ul>
        </div> 
    );
};

function renderSubMenuLinks(hasSubMenu: boolean, subMenuLinks?: SubMenuLink[]){
    if(hasSubMenu && subMenuLinks && subMenuLinks.length){
        return(
           <ul className="dropdown">
                {subMenuLinks?.map((link, index) => (                            
                    <li key={index}>
                        <Link href={link.url}>
                            {link.linkText}
                        </Link>                        
                    </li>
                ))}
           </ul>
        )
    }
};
