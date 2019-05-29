import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectosLandingComponent } from './proyectos-landing.component';

describe('PublicacionesLandingComponent', () => {
    let component: ProyectosLandingComponent;
    let fixture: ComponentFixture<ProyectosLandingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProyectosLandingComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProyectosLandingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});