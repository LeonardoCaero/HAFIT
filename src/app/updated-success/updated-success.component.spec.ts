import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatedSuccessComponent } from './updated-success.component';

describe('UpdatedSuccessComponent', () => {
  let component: UpdatedSuccessComponent;
  let fixture: ComponentFixture<UpdatedSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatedSuccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatedSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
