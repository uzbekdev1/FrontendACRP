import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUsComponent } from './contact-us.component';
import {ReactiveFormsModule, Validators} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatFormFieldModule, MatIconModule, MatInputModule, MatSidenavModule} from "@angular/material";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {ContentHeaderComponent} from "../../../shared/content-header/content-header.component";
import createSpyObj = jasmine.createSpyObj;
import {ApiService} from "../services/api-service.service";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {emailValidator} from "../../../theme/utils/app-validators";

describe('ContactUsComponent', () => {
    let component: ContactUsComponent;
    let fixture: ComponentFixture<ContactUsComponent>;
    let service ;
    beforeEach(async(() => {
        service  = createSpyObj('ApiService', ['sendMensaje']);
        TestBed.configureTestingModule({
            imports:[ReactiveFormsModule,
                FlexLayoutModule,
                MatIconModule,
                MatFormFieldModule,
                MatSidenavModule,
                MatInputModule,
                NoopAnimationsModule],
            declarations: [ContactUsComponent, ContentHeaderComponent],
            providers:[
                {
                    provide: ApiService, useValue: service
                }
            ],
            schemas:[NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ContactUsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have invalid form by default', function () {
        const form =  component.contactForm;
        expect(form.valid).toEqual(false);
    });

    it('should have invalid form when nombreRemitente is empty', function () {
        const form =  component.contactForm;
        form.get('correoRemitente').setValue('demenendez1404@gmail.com');
        form.get('telefonoRemitente').setValue('53398756');
        form.get('mensaje').setValue('Mensaje de prueba');

        expect(form.get('nombreRemitente').value).toEqual('');
        expect(form.get('nombreRemitente').valid).toEqual(false);

        expect(form.get('correoRemitente').valid).toEqual(true);
        expect(form.get('telefonoRemitente').valid).toEqual(true);
        expect(form.get('mensaje').valid).toEqual(true);

        expect(form.valid).toEqual(false);

    });

    it('should have invalid form when correoRemitente is empty', function () {
        const form =  component.contactForm;
        form.get('nombreRemitente').setValue('Daniel');
        form.get('telefonoRemitente').setValue('53398756');
        form.get('mensaje').setValue('Mensaje de prueba');

        expect(form.get('correoRemitente').value).toEqual('');
        expect(form.get('correoRemitente').valid).toEqual(false);

        expect(form.get('nombreRemitente').valid).toEqual(true);
        expect(form.get('telefonoRemitente').valid).toEqual(true);
        expect(form.get('mensaje').valid).toEqual(true);

        expect(form.valid).toEqual(false);

    });

    it('should have invalid form when telefonoRemitente is invalid', function () {
        const form =  component.contactForm;
        form.get('nombreRemitente').setValue('Daniel');
        form.get('correoRemitente').setValue('demenendez1404@gmail.com');
        form.get('mensaje').setValue('Mensaje de prueba');

        !expect(form.get('telefonoRemitente').value).toEqual('');
        expect(form.get('telefonoRemitente').valid).toEqual(false);

        expect(form.get('nombreRemitente').valid).toEqual(true);
        expect(form.get('correoRemitente').valid).toEqual(true);
        expect(form.get('mensaje').valid).toEqual(true);

        expect(form.valid).toEqual(false);

    });

    it('should have invalid form when mensaje is empty', function () {
        const form =  component.contactForm;
        form.get('nombreRemitente').setValue('Daniel');
        form.get('telefonoRemitente').setValue('53398756');
        form.get('correoRemitente').setValue('demenendez1404@gmail.com');

        expect(form.get('mensaje').value).toEqual('');
        expect(form.get('mensaje').valid).toEqual(false);

        expect(form.get('nombreRemitente').valid).toEqual(true);
        expect(form.get('telefonoRemitente').valid).toEqual(true);
        expect(form.get('correoRemitente').valid).toEqual(true);

        expect(form.valid).toEqual(false);

    });
    // nombreRemitente: ['', Validators.required],
    //     correoRemitente: ['', Validators.compose([Validators.required, emailValidator])],
    //     telefonoRemitente: ['', Validators.required],
    //     mensaje:

    it('should have valid form when provided all data valid', function () {
        const form =  component.contactForm;
        form.get('nombreRemitente').setValue('Daniel');
        form.get('telefonoRemitente').setValue('53398756');
        form.get('correoRemitente').setValue('demenendez1404@gmail.com');
        form.get('mensaje').setValue('Mensaje de prueba');

        expect(form.valid).toEqual(true);
    });

    it('should method sendMensaje have been called once ', function () {
        const message = {
            nombreRemitente:'Daniel',
            telefonoRemitente:'53398756',
            correoRemitente:'dmenendez1404@gmail.com',
            mensaje:'Mensaje de pureba'
        }
        const form =  component.contactForm;
        form.get('nombreRemitente').setValue(message.nombreRemitente);
        form.get('telefonoRemitente').setValue(message.telefonoRemitente);
        form.get('correoRemitente').setValue(message.correoRemitente);
        form.get('mensaje').setValue(message.mensaje);

        component.onContactFormSubmit(form.value);

        expect(service.sendMensaje).toHaveBeenCalled();
        expect(service.sendMensaje).toHaveBeenCalledTimes(1);
    });

    it('should method sendMensaje have been called with specific values ', function () {
        /**Arrange*/
        const message = {
            nombreRemitente:'Daniel',
            telefonoRemitente:'53398756',
            correoRemitente:'dmenendez1404@gmail.com',
            mensaje:'Mensaje de pureba'
        }
        const form =  component.contactForm;
        form.get('nombreRemitente').setValue(message.nombreRemitente);
        form.get('telefonoRemitente').setValue(message.telefonoRemitente);
        form.get('correoRemitente').setValue(message.correoRemitente);
        form.get('mensaje').setValue(message.mensaje);

        /**Act*/
        component.onContactFormSubmit(form.value);

        /**Asset*/
        expect(service.sendMensaje).toHaveBeenCalled();
        expect(service.sendMensaje).toHaveBeenCalledWith(form.value);
    });
});