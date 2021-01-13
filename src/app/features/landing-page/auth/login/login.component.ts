import { Component, OnInit, TemplateRef } from '@angular/core';
import { SettingsService } from '@app/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth';
import { first } from 'rxjs/operators';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    loginError: string;
    process = "progress";

    constructor(
        public settings: SettingsService, 
        fb: FormBuilder,
        private router: Router,
        private authService: AuthService
    ) {

        this.loginForm = fb.group({
            'email': [null, Validators.compose([Validators.required])],
            'password': [null, Validators.required]
        });

    }
    ngOnInit() {

    }


    submitForm($ev, value: any) {
        this.process = "activating";
        $ev.preventDefault();
        for (let c in this.loginForm.controls) {
            this.loginForm.controls[c].markAsTouched();
        }
        this.authService.login(value.email, value.password)
        .subscribe(
            response => {
                this.process = "progress";
                this.authService.redirectToHome();
            },
        error => {
            this.process = "progress";
            this.handleError(error);
        }
        );
    }
    handleError(error: any) {
        this.loginError = 'Invalid credentials';
    }

    
}