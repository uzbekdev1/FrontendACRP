import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicacionDialogComponent } from './publicacion-dialog.component';

describe('PublicacionDialogComponent', () => {
    let component: PublicacionDialogComponent;
    let fixture: ComponentFixture<PublicacionDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PublicacionDialogComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PublicacionDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});