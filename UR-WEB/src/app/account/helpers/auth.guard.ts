import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../service/login.service'

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private loginService: LoginService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.loginService.currentUserValue;
        // authorised so return true
        if (currentUser) {            
            return true;
        }
        // not logged in so redirect to login page with the return url
        console.log("returnUrl", state.url);
        this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}