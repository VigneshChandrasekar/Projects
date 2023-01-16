import { AuthenticationService } from "./auth/auth.service";
import { TokenService } from "./token/token.service";
import { CurrentUserService } from "./current-user/current-user.service";
import { OrderCloudBaseService } from "./base/ordercloud-base.service";
import { ProductListService } from "./products/product-list.service";

export const authService = new AuthenticationService();
export const tokenService = new TokenService();
export const currentUserService = new CurrentUserService();
export const ocBaseService = new OrderCloudBaseService();
export const productListService = new ProductListService();