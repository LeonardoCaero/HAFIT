import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatedSuccessExercicesComponent } from './updated-success-exercices.component';

describe('UpdatedSuccessExercicesComponent', () => {
  let component: UpdatedSuccessExercicesComponent;
  let fixture: ComponentFixture<UpdatedSuccessExercicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatedSuccessExercicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatedSuccessExercicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
