import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  public isAuthenticated: boolean = false;
  public userProfile: any;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });

    this.auth.user$.subscribe((user) => {
      this.userProfile = user;
    });

    this.auth.getAccessTokenSilently().subscribe((accessToken) => {
      // Si se puede obtener un nuevo token de acceso, el usuario está autenticado.
      this.isAuthenticated = true;
    }, (error) => {
      // Si no se puede obtener un nuevo token de acceso, el usuario no está autenticado.
      this.isAuthenticated = false;
      this.userProfile = null;
    });
  }
}
