import {TestBed, ComponentFixture, async} from '@angular/core/testing';
import {DebugElement} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {dispatchEvent} from '@angular/platform-browser/testing/browser_util';
import {FormGroup, AbstractControl} from '@angular/forms';
import {By} from '@angular/platform-browser';

import {ToastsManager} from 'ng2-toastr/ng2-toastr';

import {TestModule, ToastsManagerMock, TestUtils} from '../../../test-helpers';
import {LoginComponent} from './login.component';
import {AuthService} from '../../services';
import {User} from '../../models';

describe('Component: Login', () => {
    let fixture: ComponentFixture<LoginComponent>,
        component: LoginComponent,
        authService,
        router, toastr;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                TestModule
            ],
            declarations: [
                LoginComponent
            ]
        }).overrideComponent(LoginComponent, {
            set: {
                providers: [
                    {provide: ToastsManager, useClass: ToastsManagerMock}
                ]
            }
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.debugElement.componentInstance;

        // get an instance of the services injected into the component
        authService = fixture.debugElement.injector.get(AuthService);
        router = fixture.debugElement.injector.get(Router);
        toastr = fixture.debugElement.injector.get(ToastsManager);
    });

    describe('integration tests:', () => {
        let usernameEl: any,
            passwordEl: any,
            usernameErrorEl: any,
            passwordErrorEl: any,
            loginButtonEl: DebugElement,
            forgotLinkEl: DebugElement,
            loginForm: FormGroup,
            usernameFormControl: AbstractControl,
            passwordFormControl: AbstractControl,
            user = <User> {
                username: 'jesse.sanders@briebug.com',
                password: '@Angular2Rocks'
            };

        beforeEach(() => {
            // call ngOnInit
            fixture.detectChanges();

            // get the html elements
            usernameEl = fixture.debugElement.query(By.css('#username')).nativeElement;
            passwordEl = fixture.debugElement.query(By.css('#password')).nativeElement;
            loginButtonEl = fixture.debugElement.query(By.css('.btn-primary'));
            forgotLinkEl = fixture.debugElement.query(By.css('.forgot-password'));

            // Get the form and form controls
            loginForm = component.loginForm;
            usernameFormControl = loginForm.controls['username'];
            passwordFormControl = loginForm.controls['password'];
        });

        it('form should be invalid when nothing is set', async(() => {
            // arrange
            // act

            fixture.whenStable().then(() => {
                // assert
                expect(usernameFormControl.hasError('required')).toBe(true);
                expect(usernameFormControl.valid).toBe(false);

                expect(passwordFormControl.hasError('required')).toBe(true);
                expect(passwordFormControl.valid).toBe(false);

                expect(loginForm.valid).toEqual(false);
            });
        }));

        it('form should show validators when invalid', async(() => {
            // arrange
            fixture.whenStable().then(() => {
                // act
                loginButtonEl.triggerEventHandler('click', null);
                fixture.detectChanges();

                // get error divs
                usernameErrorEl = fixture.debugElement.query(By.css('.username-error')).nativeElement;
                passwordErrorEl = fixture.debugElement.query(By.css('.password-error')).nativeElement;

                // assert
                expect(usernameErrorEl.innerText).toBe('usernameRequired');
                expect(passwordErrorEl.innerText).toBeTruthy('passwordsRequired');
            });
        }));

        it('form should be valid with proper values', async(() => {
            // arrange
            fixture.whenStable().then(() => {
                // act
                usernameEl.value = user.username;
                dispatchEvent(usernameEl, 'input');

                passwordEl.value = user.password;
                dispatchEvent(passwordEl, 'input');

                fixture.detectChanges();

                // assert
                expect(usernameFormControl.hasError('required')).toBe(false);
                expect(usernameFormControl.valid).toBe(true);

                expect(passwordFormControl.hasError('required')).toBe(false);
                expect(passwordFormControl.valid).toBe(true);

                expect(loginForm.valid).toEqual(true);
            });
        }));

        it('form should navigate to dashboard on successful login', async(() => {
            // arrange
            spyOn(router, 'navigate');

            fixture.whenStable().then(() => {
                // act
                usernameEl.value = user.username;
                dispatchEvent(usernameEl, 'input');

                passwordEl.value = user.password;
                dispatchEvent(passwordEl, 'input');

                loginButtonEl.triggerEventHandler('click', null);
                fixture.detectChanges();

                // assert
                expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
            });
        }));

        it('should show toaster and destroy session when auth call fails', async(() => {
            // arrange
            // spy on toastr
            spyOn(toastr, 'error');

            // set auth service to fail
            authService.login = TestUtils.failure;

            fixture.whenStable().then(() => {
                // act
                usernameEl.value = user.username;
                dispatchEvent(usernameEl, 'input');

                passwordEl.value = user.password;
                dispatchEvent(passwordEl, 'input');

                fixture.detectChanges();

                loginButtonEl.triggerEventHandler('click', null);
                fixture.detectChanges();

                expect(toastr.error).toHaveBeenCalledWith('loginError');
            });
        }));

        it('form should navigate to forgot password when link is clicked', async(() => {
            // arrange
            spyOn(router, 'navigateByUrl');

            fixture.whenStable().then(() => {
                // act
                forgotLinkEl.nativeElement.click();
                fixture.detectChanges();

                let args = router.navigateByUrl.calls.mostRecent();

                //console.log(router.navigateByURL.calls.mostRecent().args[0]);
                
                // assert
                expect(router.navigateByUrl).toHaveBeenCalled();
                // expect(router.navigateByUrl).toHaveBeenCalledWith(['/forgot', { skipLocationChange: false, replaceUrl: false }]);
            });
        }));
    });
});
