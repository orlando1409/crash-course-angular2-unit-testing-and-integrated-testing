import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {TranslateService} from 'ng2-translate/ng2-translate';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';

import {AuthService, SessionService} from '../../services';
import {User} from '../../models';

@Component({
    selector: 'np-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent implements OnInit {
    user: User;
    showErrors: boolean;
    loginForm: FormGroup;

    constructor(private router: Router,
                private authService: AuthService,
                private sessionService: SessionService,
                private fb: FormBuilder,
                private toastr: ToastsManager,
                private translate: TranslateService) {
    }

    ngOnInit() {
        // destroy the session every time we init the login page
        this.sessionService.destroy();

        this.user = new User();

        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    login() {
        this.showErrors = true;

        if (this.loginForm.valid) {
            this.authService.login(this.user)
                .subscribe((res: any) => {
                    this.sessionService.token = res.token;
                    this.router.navigate(['/dashboard']);
                }, () => {
                    this.toastr.error(this.translate.instant('loginError'));
                    this.sessionService.destroy();
                });
        } else {
            this.toastr.error(this.translate.instant('invalidForm'));
        }
    }
}
