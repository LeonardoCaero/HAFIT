import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercicesViewComponent } from './exercices-view.component';

describe('ExercicesViewComponent', () => {
  let component: ExercicesViewComponent;
  let fixture: ComponentFixture<ExercicesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExercicesViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExercicesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
