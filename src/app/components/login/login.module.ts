import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormBuilder} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {TranslateModule} from 'ng2-translate/ng2-translate';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';

import {LoginComponent} from './login.component';

import {AuthService} from '../../services';

@NgModule({
    imports: [
        CommonModule, ReactiveFormsModule, RouterModule, TranslateModule
    ],
    declarations: [LoginComponent],
    providers: [FormBuilder, ToastsManager, AuthService],
    exports: [LoginComponent]
})
export class LoginModule {
}
