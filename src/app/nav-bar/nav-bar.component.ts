import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  public userProfile: any;

  constructor(private auth: AuthService){
    this.auth.user$.subscribe((user) => {
      this.userProfile = user;
    });

  }

  playSound() {
    let audio = new Audio();
    audio.src = "../assets/sounds/swoosh.mp3";
    audio.load();
    audio.play();
  }
  login() {
    this.auth.loginWithRedirect();
  }

  ngOnInit(): void{

  }

}
