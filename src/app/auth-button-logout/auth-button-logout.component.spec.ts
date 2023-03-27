import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthButtonLogoutComponent } from './auth-button-logout.component';

describe('AuthButtonLogoutComponent', () => {
  let component: AuthButtonLogoutComponent;
  let fixture: ComponentFixture<AuthButtonLogoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthButtonLogoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthButtonLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
