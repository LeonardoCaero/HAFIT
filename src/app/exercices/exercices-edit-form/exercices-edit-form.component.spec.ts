import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercicesEditFormComponent } from './exercices-edit-form.component';

describe('ExercicesEditFormComponent', () => {
  let component: ExercicesEditFormComponent;
  let fixture: ComponentFixture<ExercicesEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExercicesEditFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExercicesEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
