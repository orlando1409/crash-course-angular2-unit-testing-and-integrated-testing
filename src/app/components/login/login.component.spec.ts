import {TestBed, ComponentFixture, async, fakeAsync, tick} from '@angular/core/testing';
import {Router} from '@angular/router';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';

import {TestModule, ToastsManagerMock, TestUtils} from '../../../test-helpers';
import {LoginComponent} from './login.component';
import {AuthService, SessionService} from '../../services';
import {User} from '../../models';

describe('Component: Login', () => {
    let fixture: ComponentFixture<LoginComponent>,
        component: LoginComponent,
        authService,
        sessionService,
        router, toastr,
        user = <User> {
            username: 'jesse.sanders@briebug.com',
            password: '@Angular2Rocks'
        };

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
        sessionService = fixture.debugElement.injector.get(SessionService);
        authService = fixture.debugElement.injector.get(AuthService);
        router = fixture.debugElement.injector.get(Router);
        toastr = fixture.debugElement.injector.get(ToastsManager);
    });

    describe('unit tests:', () => {
        it('should create the component', async(() => {
            // arrange
            // act

            // assert
            expect(component).toBeTruthy();
        }));

        it('should call session.destroy on init', async(() => {
            // arrange
            spyOn(sessionService, 'destroy');

            // act
            fixture.detectChanges();

            // assert
            expect(sessionService.destroy).toHaveBeenCalled();
        }));

        it('form should be invalid on init', async(() => {
            // arrange
            // act
            fixture.detectChanges();

            // assert
            expect(component.loginForm.valid).toBe(false, 'form should not be valid on init');
        }));

        describe('login method', () => {
            it('should show toastr error message when form is not valid', async(() => {
                // arrange
                fixture.detectChanges();

                // setup spy for toastr error
                spyOn(toastr, 'error');

                // act
                component.login();
                fixture.detectChanges();

                // assert
                expect(toastr.error).toHaveBeenCalledWith('invalidForm');
            }));

            it('should navigate to dashboard on successful login', async(() => {
                // arrange
                fixture.detectChanges();
                sessionService.token = undefined;

                // set form model
                component.user.username = user.username;
                component.user.password = user.password;
                fixture.detectChanges();

                spyOn(router, 'navigate');
                spyOn(authService, 'login')
                    .and.callThrough();

                // act
                component.login();
                fixture.detectChanges();

                // assert
                expect(component.showErrors).toBe(true);
                expect(sessionService.token).toBe(authService.token);
                expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
            }));

            it('should show toaster and destroy session when auth call fails', async(() => {
                // arrange
                fixture.detectChanges();

                // set form model
                component.user.username = user.username;
                component.user.password = user.password;
                fixture.detectChanges();

                // setup spys
                spyOn(toastr, 'error');
                spyOn(sessionService, 'destroy');

                // set auth service to fail
                authService.login = TestUtils.failure;

                // act
                component.login();
                fixture.detectChanges();

                // assert
                expect(toastr.error).toHaveBeenCalledWith('loginError');
                expect(sessionService.destroy).toHaveBeenCalled();
            }));

            it('tick test', fakeAsync(() => {
                tick(10000);
                // assert            
                expect(null);
            }));
            
        });
    });
});
