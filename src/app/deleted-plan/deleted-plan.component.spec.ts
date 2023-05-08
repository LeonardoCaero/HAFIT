import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedPlanComponent } from './deleted-plan.component';

describe('DeletedPlanComponent', () => {
  let component: DeletedPlanComponent;
  let fixture: ComponentFixture<DeletedPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletedPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletedPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
