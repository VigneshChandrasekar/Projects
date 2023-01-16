import { tokenService } from "..";
export class CurrentUserService{
    constructor(){}

    isAnonymous(): boolean {
        return tokenService.isTokenAnonymous();
    }
}