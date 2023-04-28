import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-auth-button-logout',
  template: `

      <button (click)="auth.logout({ logoutParams: { returnTo: document.location.origin } })">
        Log out
      </button>


    
  `,
  styles: [],
})
export class AuthButtonLogoutComponent {
  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService) {}
}