import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JuntaLandingComponent } from './junta-landing.component';

describe('JuntaLandingComponent', () => {
    let component: JuntaLandingComponent;
    let fixture: ComponentFixture<JuntaLandingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [JuntaLandingComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(JuntaLandingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});