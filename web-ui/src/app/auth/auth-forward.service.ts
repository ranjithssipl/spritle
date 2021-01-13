import { Injectable } from '@angular/core';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AuthForwardService implements CanActivate {

    constructor(
        private router: Router,
        private authService: AuthService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // Redirecting Authenticated user
        if (this.authService.authenticated()) {

            this.authService.redirectToHome();
            return false;

        } else return true;
    }
}