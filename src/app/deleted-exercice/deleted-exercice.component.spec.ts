import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedExerciceComponent } from './deleted-exercice.component';

describe('DeletedExerciceComponent', () => {
  let component: DeletedExerciceComponent;
  let fixture: ComponentFixture<DeletedExerciceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletedExerciceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletedExerciceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
