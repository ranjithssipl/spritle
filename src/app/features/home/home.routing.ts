import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';

import { AuthGuardService } from '@app/auth';
const homeRoutes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent, data: { breadcrumbs: 'Home' } },
];

@NgModule({
    imports: [
        RouterModule.forChild(homeRoutes)
    ],
    providers: [
    ]
})

export class HomeRoutingModule { }
