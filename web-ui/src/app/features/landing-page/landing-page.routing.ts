import { RouterModule, Routes } from '@angular/router';

import { LandingPageComponent } from './landing-page.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthForwardService } from '@app/auth';


const LandingPageRoutes: Routes = [
    { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
    {
        path: '',
        component: LandingPageComponent,
        children: [
            {
                path: 'auth',
                component: AuthComponent,
                canActivate: [AuthForwardService],
                children: [
                    { path: '', redirectTo: 'login', pathMatch: 'full' },
                    // Login Page
                    { path: 'login', component: LoginComponent },
                ]
            },

        ]
    }

];

export const LandingPageRouting = RouterModule.forChild(LandingPageRoutes);
