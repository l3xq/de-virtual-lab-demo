import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLessonsComponent } from './edit-lessons.component';

describe('EditLessonsComponent', () => {
  let component: EditLessonsComponent;
  let fixture: ComponentFixture<EditLessonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLessonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLessonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
