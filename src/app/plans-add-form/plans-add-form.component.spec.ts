import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlansAddFormComponent } from './plans-add-form.component';

describe('PlansAddFormComponent', () => {
  let component: PlansAddFormComponent;
  let fixture: ComponentFixture<PlansAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlansAddFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlansAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
