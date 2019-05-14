import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiaDialogComponent } from './noticia-dialog.component';

describe('NoticiaDialogComponent', () => {
  let component: NoticiaDialogComponent;
  let fixture: ComponentFixture<NoticiaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticiaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticiaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
