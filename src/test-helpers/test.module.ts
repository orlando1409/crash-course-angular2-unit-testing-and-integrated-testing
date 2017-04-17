import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {NgForm} from '@angular/forms';

import {TranslateModule, TranslateService} from 'ng2-translate/ng2-translate';
import {ToastModule, ToastsManager} from 'ng2-toastr/ng2-toastr';

import {AuthService, SessionService} from '../app/services';
import {ToastsManagerMock, AuthServiceMock, SessionServiceMock} from './index';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
        ToastModule
    ],
    declarations: [],
    providers: [
        TranslateService,
        NgForm,
        {provide: AuthService, useClass: AuthServiceMock},
        {provide: SessionService, useClass: SessionServiceMock},
        {provide: ToastsManager, useClass: ToastsManagerMock}
    ],
    exports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        TranslateModule,
        ToastModule
    ]
})
export class TestModule {
}
