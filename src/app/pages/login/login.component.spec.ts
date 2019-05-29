import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import createSpyObj = jasmine.createSpyObj;
import {AuthService} from "./auth.service";
import {FlexLayoutModule} from "@angular/flex-layout";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule, MatIconModule, MatInputModule, MatSidenavModule} from "@angular/material";
import {ContentHeaderComponent} from "../../shared/content-header/content-header.component";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let service ;
    beforeEach(async(() => {
        service  = createSpyObj('AuthService', ['login']);
        TestBed.configureTestingModule({
            imports:[ReactiveFormsModule,
                FlexLayoutModule,
                MatIconModule,
                MatFormFieldModule,
                MatSidenavModule,
                MatInputModule,
            NoopAnimationsModule],
            declarations: [LoginComponent, ContentHeaderComponent],
            providers:[
                {
                    provide: AuthService, useValue: service
                }
            ],
            schemas:[NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should have invalid user and password by default', function () {
        const form =  component.form;
        expect(form.valid).toEqual(false);
    });
    it('should have invalid form when user is empty', function () {
        const form =  component.form;
        form.get('password').setValue('Abc123');

        expect(form.get('username').value).toEqual('');
        expect(form.get('username').valid).toEqual(false);
        expect(form.get('password').valid).toEqual(true);
        expect(form.valid).toEqual(false);

    });
    it('should have invalid form when password is empty', function () {
        const form =  component.form;
        form.get('username').setValue('daniel');

        expect(form.get('password').value).toEqual('');
        expect(form.get('password').valid).toEqual(false);
        expect(form.get('username').valid).toEqual(true);
        expect(form.valid).toEqual(false);

    });

    it('should have valid form when provided username and password', function () {
        const form =  component.form;
        form.get('username').setValue('daniel');
        form.get('password').setValue('Abc123');

        expect(form.valid).toEqual(true);
    });
    it('should method login have been called once ', function () {
        /**Arrange*/
        const credentials = {
            username:'daniel',
            password:'Abc123'
        }
        const form =  component.form;
        form.get('username').setValue(credentials.username);
        form.get('password').setValue(credentials.password);

        /**Act*/
        component.onSubmit();

        /**Asset*/
        expect(service.login).toHaveBeenCalled();
        expect(service.login).toHaveBeenCalledTimes(1);

    });
    it('should method login have been called with specific values ', function () {
        const credentials = {
            username:'daniel',
            password:'Abc123'
        }
        const form =  component.form;
        form.get('username').setValue(credentials.username);
        form.get('password').setValue(credentials.password);

        component.onSubmit();
        expect(service.login).toHaveBeenCalled();
        expect(service.login).toHaveBeenCalledWith(credentials);

    });
});