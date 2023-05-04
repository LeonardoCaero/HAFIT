import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SociSubscribeComponent } from './soci-subscribe.component';

describe('SociSubscribeComponent', () => {
  let component: SociSubscribeComponent;
  let fixture: ComponentFixture<SociSubscribeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SociSubscribeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SociSubscribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
