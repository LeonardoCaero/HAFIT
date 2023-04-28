import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercicesAddFormComponent } from './exercices-add-form.component';

describe('ExercicesAddFormComponent', () => {
  let component: ExercicesAddFormComponent;
  let fixture: ComponentFixture<ExercicesAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExercicesAddFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExercicesAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
