import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  providers: [AuthServiceService],
})
export class NavBarComponent implements OnInit {
  public isAuthenticated: boolean = false;
  public userProfile: any;
  public cartItems: number = 0;

  constructor(
    private auth: AuthService,
    private authService: AuthServiceService,
    private router: Router,
    private navbarService: NavbarService
  ) {}

  ngOnInit() {
    this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });

    this.auth.user$.subscribe((user) => {
      this.userProfile = user;

    });

    this.auth.getAccessTokenSilently().subscribe(
      (accessToken) => {
        this.isAuthenticated = true;
      },
      (error) => {
        this.isAuthenticated = false;
        this.userProfile = null;
      }
    );
    
    // this.cartItems = this.navbarService.getCartItems(this.userProfile.userId);
    // this.navbarService.cartItems$.subscribe((newCartItems: number) => {
    //   this.cartItems = newCartItems;
    // });
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
