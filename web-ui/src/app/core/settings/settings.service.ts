import { Inject, Injectable, forwardRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { registerLocaleData } from '@angular/common';
declare var $: any;
declare var System: any;
//--
import { InterfaceService } from '@app/interfaces';
import { appDetails, authTokenId, GetApiurl } from './config';
import { AppPreferences, User } from '@app/models';
import { ThemesService } from '../themes/themes.service';
import { isTokenExpired, setToken, unsetToken } from '../../auth/token';

@Injectable()
export class SettingsService extends InterfaceService {
    // App Settings
    // -----------------------------------
    private app: Object;

    // User Settings
    // -----------------------------------
    private userSource = new BehaviorSubject<User>(new User());
    user$: Observable<User> = this.userSource.asObservable();
    private userPermissionsSource = new BehaviorSubject<Array<string>>([]);
    userPermissions$: Observable<Array<string>> = this.userPermissionsSource.asObservable();

    // Layout Settings
    // -----------------------------------
    private appPreferencesSource = new BehaviorSubject<AppPreferences>(new AppPreferences());
    appPreferences$: Observable<AppPreferences> = this.appPreferencesSource.asObservable();

    constructor(
        @Inject(forwardRef(() => ThemesService)) private themesService,
        private http: HttpClient,
        // private router: Router
    ) {
        super();
        this.app = appDetails;
    }

    getAppSetting(name) {
        return name ? this.app[name] : this.app;
    }

    loadAppData(): Promise<boolean> {

        return new Promise<boolean>((resolve, reject) => {

            if (isTokenExpired()) {
                // Proceeding to bootstrap app if not authenticated
                this.setUser();
                resolve(true);
            } else {
                // Fetches config data and bootstraps app if authenticated
                this.getUserdata().subscribe(
                    response => {
                        setToken(response['token']);
                        this.setUser(response['user']);

                        // this.setAppPreferences(response['user_settings']);

                        resolve();
                    },
                    error => {
                        unsetToken();
                        resolve(error)
                    }
                );
            }
        });

    }


    setUser( details?: Object) {
        if(!(details instanceof Object)) details = {};

        this.userPermissionsSource.next(details['permissions'] || []);
        delete details['permissions'];

        this.userSource.next(new User(details));
    }
    
    setAppPreferences(settings) {
        this.appPreferencesSource.next(new AppPreferences(settings));

        let preferences = this.appPreferencesSource.getValue();
        this.themesService.setTheme(preferences.applicationTheme);
    }

    toggleLayoutSetting(name) {
        // return this.setLayoutSetting(name, !this.getLayoutSetting(name));
    }

    // Get user data & new token
    getUserdata() {
        let credentials = `{"token":"${localStorage.getItem('id_token')}"}`
        return this.http
            .post(this.getApiUrl('api-token-refresh/'), credentials, this.getHttpOptions())
            .pipe(
                map(response => response),
                catchError(this.handleError)
            );
    }

}
