/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {MyComponentComponent} from './my-component.component';

describe('MyComponentComponent', () => {
    let component: MyComponentComponent;
    let fixture: ComponentFixture<MyComponentComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MyComponentComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MyComponentComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        spyOn(component, 'ngOnInit')
            .and.callThrough();

        fixture.detectChanges(); /*avoid calling ng on init direclty*/
        expect(component).toBeTruthy();

        expect(component.ngOnInit).toHaveBeenCalledWith();
    });
});
