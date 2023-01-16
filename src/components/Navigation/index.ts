import { NavigationLinkList, NavigationLink } from "../../models/navigation.linklist";

const fetcher = async (url:string): Promise<NavigationLinkList> => {
    const response = await fetch(url);
    var data = await response.json();
    let linkList: NavigationLinkList = JSON.parse(data);
    return linkList;
};


function getClassName(link: NavigationLink, activeIndex:number, index:number): string{
    let className = link.hasSubMenu ? "has-dropdown " : "";
    className += activeIndex === index ? "active" : "";
    return className.trim();
};

export { fetcher, getClassName };