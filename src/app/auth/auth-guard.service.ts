import { Injectable } from '@angular/core';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private router: Router, private authService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        // Validating url params
        if (route.data.hasOwnProperty('regex')) {
            let params = route.params;

            Object.entries(params).forEach(
                ([param, value]) => {
                    if(route.data['regex'].hasOwnProperty(param)){
                        let regex_str = `^${route.data['regex'][param]}$`;
                        let exp = new RegExp(regex_str, 'g');
    
                        if (!exp.test(value)) {
                            this.router.navigate(['/error/not-found']);
                            return false;
                        }
                    }
                }
            )
        }

        // Checks is user authenticated
        if (!this.authService.authenticated()) {
            this.router.navigate(['/auth/login']);
            return false;
        }
        // Checks permission if roles provided
        if (!route.data.hasOwnProperty('roles'))
            return true;
        else {
            if (this.authService.permitted(route.data['roles'])) return true;
            else {
                this.router.navigate(['/error/denied']);
                return false;
            }
        }
    }
}
