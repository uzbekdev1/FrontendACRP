import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoletinDialogComponent } from './boletin-dialog.component';

describe('BoletinDialogComponent', () => {
    let component: BoletinDialogComponent;
    let fixture: ComponentFixture<BoletinDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BoletinDialogComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BoletinDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});