export interface NavigationLinkList{
    Links: NavigationLink[]
};

export interface NavigationLink{
    url: string,
    linkText: string,
    hasSubMenu: boolean,
    subMenuLinks?: SubMenuLink[]
};

export interface SubMenuLink{
    url: string,
    linkText: string    
}