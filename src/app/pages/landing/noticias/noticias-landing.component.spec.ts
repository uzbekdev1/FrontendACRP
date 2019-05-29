import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiasLandingComponent } from './noticias-landing.component';

describe('NoticiasLandingComponent', () => {
    let component: NoticiasLandingComponent;
    let fixture: ComponentFixture<NoticiasLandingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NoticiasLandingComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NoticiasLandingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});