import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  constructor(){

  }

  playSound() {
    let audio = new Audio();
    audio.src = "../assets/sounds/swoosh.mp3";
    audio.load();
    audio.play();
  }

  ngOnInit(): void{

  }
}
