import { Inject, Injectable, forwardRef, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import 'rxjs/add/operator/catch';

import { InterfaceService } from '@app/interfaces';
import { setToken, getToken, unsetToken, getTokenExpiration, isTokenExpired } from './token';
import { User } from '@app/models';
import { SettingsService } from '@app/core';


@Injectable()
export class AuthService extends InterfaceService {
    user: User;
    userPermissions: Array<string> = [];

    constructor(
        private http: HttpClient,
        private router: Router,
        @Inject(forwardRef(() => SettingsService)) private settings,
    ) {
        super();

        this.subscriptions['user'] = this.settings.user$.subscribe(u => this.user = u);
        this.subscriptions['userPermissions'] = this.settings.userPermissions$.subscribe(ps => this.userPermissions = ps);
    }

    // Checks is authenticated
    public authenticated() {
        // Check if there's an unexpired JWT
        return !isTokenExpired();
    }

    // Checks is user has roles 
    public permitted(roles: Array<string>) {

        if (!(this.user instanceof Object) || !(this.userPermissions instanceof Array)) return false;
        else {
            if (intersect(this.userPermissions, roles).length == roles.length) return true;
            else return false;
        }


        function intersect(a, b) {
            var t;
            if (b.length > a.length) t = b, b = a, a = t; // indexOf to loop over shorter
            return a.filter(e => b.indexOf(e) > -1).filter((e, i, c) => c.indexOf(e) === i);// extra step to remove duplicates
        }
    }

    // Login action
    public login(username: string, password: string) {
        let credentials = `{"username":"${username}","password":"${password}"}`;

        return this.http.post(this.getApiUrl("api-token-auth/"), credentials, this.getHttpOptions('json', false))
            .pipe(
                tap(response => this.handleAuthResponse(response)),
                catchError(this.handleError)
            );
    }

    // Refreshing token
    public refreshToken() {
        console.log("Token expired refreshing : ", new Date());

        return this.http.get(this.getApiUrl("api-token-refresh/"), this.getHttpOptions('json', false))
            .pipe(
                tap(response => this.handleAuthResponse(response[0])),
                catchError(error => {
                    error = this.handleError(error);
                    this.router.navigate(['/login']);
                    return error;
                })
            );
    }

    // Logout action
    public logout() {
        if (getToken()) {
            unsetToken();
            this.settings.setUser();
        }

        localStorage.clear();
        this.router.navigate(['/auth/login']);
    }

    // API call to validate user details and generate password reset link
    generatePasswordResetLink(email: string) {
        let data = {
            'email': email
            // 'base_path': window.location.origin + this.router.createUrlTree(['/auth/password/reset/confirm/']).toString()
        }


        return this.http
            .post(this.getApiUrl(`api_password_reset/`), JSON.stringify(data), this.getHttpOptions())
            .pipe(catchError(this.handleError));
    }

    // API call to verify password reset key
    verifyPasswordResetToken(token: string) {
       
        let data = {
            'token': token,
        }

        return this.http
            .post(this.getApiUrl(`api_password_verify/`), JSON.stringify(data), this.getHttpOptions())
            .pipe(catchError(this.handleError));
    }

    // API call to reset password
    resetPassword(token: string, password: string) {
        let data = {
            'new_password': password,
            'token': token
        }

        return this.http
        .post(this.getApiUrl(`api_password_confirm/`), JSON.stringify(data), this.getHttpOptions())
        .pipe(catchError(this.handleError));

    }

    // Handle response and schedule token auto refresh
    public handleAuthResponse(response: any): void {

        setToken(response['token']);
        this.settings.setUser(response['user']);

        let now = new Date().valueOf();
        let exp = <Date>getTokenExpiration();
        let delay = exp.valueOf() - now;

        let timer = Observable.timer(delay - 60);

        timer.subscribe(() => {
            this.refreshToken().subscribe();
        });
    }

    // Redirecting to respective homepages for the recpective user types
    redirectToHome() {
        console.log("fa")
        this.router.navigate(['/app']);
    }

    getClasses() {
        const url = this.getApiUrl(`create_user/get-classes/`);
        return this.http.get(url,this.getHttpOptions('json'))
        .pipe(
          map(Response => Response),
          catchError(this.handleError)
        );
      }

      showClasses(data) {
        const url = this.getApiUrl(`create_user/show-classes/`);
        return this.http.post(url,JSON.stringify(data), this.getHttpOptions('json'))
        .pipe(
          map(Response => Response),
          catchError(this.handleError)
        );
      }



}
