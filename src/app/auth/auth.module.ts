import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS} from '@angular/common/http';
import { Http, RequestOptions } from '@angular/http';

// --
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { AuthForwardService } from './auth-forward.service';
import { TokenInterceptor } from './token.interceptor';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    AuthService,
    AuthGuardService,
    AuthForwardService,

    // Http token interceptor
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptor,
    //   multi: true
    // }
  ]
})
export class AuthModule { }

