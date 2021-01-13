import { RouterModule, Routes } from '@angular/router';

//--
import { AuthGuardService } from '@app/auth';
import { LayoutComponent } from './layout/layout.component';
import { AuthForwardService } from '@app/auth';

const featureRoutes: Routes = [
    {
        path: '',
        loadChildren: './landing-page/landing-page.module#LandingPageModule'
    },
    {
        path: 'app',
        component: LayoutComponent,
        canActivate: [AuthGuardService],
        data: {
            breadcrumbs: 'App'
        },
        children: [
            { path: '', loadChildren: './home/home.module#HomeModule', },
        ]
    },
    {
        path: 'error',
        loadChildren: './error/error.module#ErrorModule'
    },
    { path: '**', redirectTo: 'error' }

];


export const featuresRouting = RouterModule.forRoot(featureRoutes);

