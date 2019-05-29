import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectosComponent } from './proyectos.component';
import {ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import {
    MAT_DIALOG_DATA,
    MatDialogModule, MatDialogRef,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule, MatMenuModule,
    MatSelectModule,
    MatSidenavModule
} from "@angular/material";
import {HttpClientModule} from "@angular/common/http";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {ProyectoDialogComponent} from "./proyecto-dialog/proyecto-dialog.component";
import {ApiService} from "../landing/services/api-service.service";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {ProyectoDialogComponentTet} from "./proyecto-dialog/proyecto-dialog.component.spec";
import createSpyObj = jasmine.createSpyObj;
import {ProyectosService} from "./proyectos.service";
import {UsersService} from "../users/users.service";

describe('ProyectosComponent', () => {
    let component: ProyectosComponent;
    let fixture: ComponentFixture<ProyectosComponent>;
    let service;
    beforeEach(async(() => {
        service  = createSpyObj('ProyectosService', ['getProyectos']);
        service.getProyectos.and.returnValue([{"id": 1,
            "titulo": "Tesis",
            "categoria": "Estudiantil",
            "pdf": "http://127.0.0.1:8000/media/Asamblea_de_Accionistas.pdf",
            "descripcion": "Necesita mejoras",
            "miembros": [
                1,
                2
            ]}])
        TestBed.configureTestingModule({
            imports:[
                ReactiveFormsModule,
                FlexLayoutModule,
                MatIconModule,
                MatFormFieldModule,
                MatSidenavModule,
                HttpClientModule,
                MatInputModule,
                MatMenuModule,
                MatDialogModule,
                NoopAnimationsModule,
                MatSelectModule],
            declarations: [ProyectosComponent],
            providers:[UsersService,
              {
                    provide: ProyectosService, useValue: service
                }
            ],
            schemas:[NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProyectosComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });


});