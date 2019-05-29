import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicacionesLandingComponent } from './publicaciones-landing.component';

describe('PublicacionesLandingComponent', () => {
    let component: PublicacionesLandingComponent;
    let fixture: ComponentFixture<PublicacionesLandingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PublicacionesLandingComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PublicacionesLandingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});