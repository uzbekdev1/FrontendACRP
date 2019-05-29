import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CentroDialogComponent } from './centro-dialog.component';

describe('CentroDialogComponent', () => {
    let component: CentroDialogComponent;
    let fixture: ComponentFixture<CentroDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CentroDialogComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CentroDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});