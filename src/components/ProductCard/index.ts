import { HSXpImage } from "../../models/xpimage.model";

function getDefaultProductImage(images?: HSXpImage[]): string {
    if(images && images.length){                
        var _images = images.filter(img => img.url);                
        if(_images && _images.length){
            return _images[0].url;
        }
    }    
    return "";
}

function getPrice(price?: number, currencyCode?: string): string{
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode
    });
    return price ? formatter.format(price) : "";
}

export { getDefaultProductImage, getPrice };