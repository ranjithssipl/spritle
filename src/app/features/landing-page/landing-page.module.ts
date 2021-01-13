import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth/auth.component';
import { LandingPageComponent } from './landing-page.component';
import { LoginComponent } from './auth/login/login.component';
import { SharedModule } from '@app/shared';
import { LandingPageRouting } from './landing-page.routing'

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    LandingPageRouting
  ],
  declarations: [
    AuthComponent, 
    LandingPageComponent, 
    LoginComponent,
  ],
})
export class LandingPageModule { }
