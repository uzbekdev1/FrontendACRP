import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadMoreDialogComponent } from './read-more-dialog.component';

describe('ReadMoreDialogComponent', () => {
    let component: ReadMoreDialogComponent;
    let fixture: ComponentFixture<ReadMoreDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ReadMoreDialogComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ReadMoreDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});