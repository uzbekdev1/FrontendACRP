import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoletinesLandingComponent } from './boletines-landing.component';

describe('BoletinesLandingComponent', () => {
    let component: BoletinesLandingComponent;
    let fixture: ComponentFixture<BoletinesLandingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BoletinesLandingComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BoletinesLandingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});