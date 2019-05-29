import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosLandingComponent } from './eventos-landing.component';

describe('EventosLandingComponent', () => {
    let component: EventosLandingComponent;
    let fixture: ComponentFixture<EventosLandingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EventosLandingComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EventosLandingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});