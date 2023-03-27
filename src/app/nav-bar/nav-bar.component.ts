import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  constructor(private auth: AuthService){

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
