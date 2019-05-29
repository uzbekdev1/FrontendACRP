import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectoDialogComponent } from './proyecto-dialog.component';
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import {
    MAT_DIALOG_DATA,
    MatDialogModule,
    MatDialogRef,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule, MatSelectModule,
    MatSidenavModule
} from "@angular/material";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {LoginComponent} from "../../login/login.component";
import {ContentHeaderComponent} from "../../../shared/content-header/content-header.component";
import {AuthService} from "../../login/auth.service";
import {NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import createSpyObj = jasmine.createSpyObj;
import {ApiService} from "../../landing/services/api-service.service";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
    entryComponents:[ProyectoDialogComponent]
})
export class ProyectoDialogComponentTet {}

describe('ProyectoDialogComponent', () => {
    let component: ProyectoDialogComponent;
    let fixture: ComponentFixture<ProyectoDialogComponent>;
    let service ;
    beforeEach(async(() => {
        service  = createSpyObj('ApiService', ['getMiembros']);
        service.getMiembros.and.returnValue([])

        TestBed.configureTestingModule({
            imports:[
                ProyectoDialogComponentTet,
                ReactiveFormsModule,
                FlexLayoutModule,
                MatIconModule,
                MatFormFieldModule,
                MatSidenavModule,
                HttpClientModule,
                MatInputModule,
                MatDialogModule,
                NoopAnimationsModule,
                MatSelectModule],
            declarations: [ProyectoDialogComponent],
           providers:[
                { provide: MatDialogRef, useValue: {} },
                { provide: MAT_DIALOG_DATA, useValue: null },
                {
                    provide: ApiService, useValue: service
                }
            ],
            schemas:[NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProyectoDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have invalid form by default', function () {
        const form =  component.form;
        expect(form.valid).toEqual(false);
    });

    it('should have invalid form when titulo is empty', function () {
        const form =  component.form;
        console.log('FRM ',form.value);

        form.get('descripcion').setValue('Proyecto de prueba');
        form.get('miembros').setValue([1]);
        form.get('categoria').setValue('Tesis');

        expect(form.get('titulo').value).toEqual('');
        expect(form.get('titulo').valid).toEqual(false);

        expect(form.get('descripcion').valid).toEqual(true);
        expect(form.get('miembros').valid).toEqual(true);
        expect(form.get('categoria').valid).toEqual(true);

        expect(form.valid).toEqual(false);

    });

    it('should have invalid form when descripcion is empty', function () {
        const form =  component.form;
        form.get('titulo').setValue('Proyecto de prueba');
        form.get('miembros').setValue([1]);
        form.get('categoria').setValue('Tesis');

        expect(form.get('descripcion').value).toEqual('');
        expect(form.get('descripcion').valid).toEqual(false);

        expect(form.get('titulo').valid).toEqual(true);
        expect(form.get('miembros').valid).toEqual(true);
        expect(form.get('categoria').valid).toEqual(true);

        expect(form.valid).toEqual(false);

    });

    it('should have invalid form when miembros is empty', function () {
        const form =  component.form;
        form.get('titulo').setValue('Proyecto de prueba');
        form.get('descripcion').setValue('Proyecto de prueba');
        form.get('categoria').setValue('Tesis');

        expect(form.get('miembros').value).toEqual('');
        expect(form.get('miembros').valid).toEqual(false);

        expect(form.get('titulo').valid).toEqual(true);
        expect(form.get('descripcion').valid).toEqual(true);
        expect(form.get('categoria').valid).toEqual(true);

        expect(form.valid).toEqual(false);

    });

    it('should have invalid form when categoria is empty', function () {
        const form =  component.form;
        form.get('titulo').setValue('Proyecto de prueba');
        form.get('descripcion').setValue('Proyecto de prueba');
        form.get('miembros').setValue([1]);

        expect(form.get('categoria').value).toEqual('');
        expect(form.get('categoria').valid).toEqual(false);

        expect(form.get('titulo').valid).toEqual(true);
        expect(form.get('descripcion').valid).toEqual(true);
        expect(form.get('miembros').valid).toEqual(true);
        console.log('asdasdsd', form.value)
        expect(form.valid).toEqual(false);
    });

    it('should have valid form when provided all data valid', function () {
        const form =  component.form;
        form.get('titulo').setValue('Proyecto de prueba');
        form.get('descripcion').setValue('Proyecto de prueba');
        form.get('miembros').setValue([1]);
        form.get('categoria').setValue('Tesis');

        expect(form.valid).toEqual(true);
    });

});