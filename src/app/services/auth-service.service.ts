import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { UserDataService } from './user-data.service';
import { take } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  userData!: any;
  constructor(
    private auth: AuthService,
    @Inject(DOCUMENT) private document: Document,
    private userService: UserDataService
  ) {}

  private currentUserId: Number | undefined = 0;

  login() {  
    this.auth.loginWithRedirect();
  }
  
  

  logout() {
    this.auth.logout();
    this.currentUserId = 0;
  }
 
  checkUser(){
    this.auth.user$.pipe(take(1)).subscribe((user) => {
      if (user) {
        this.userService.getUser('email', user.email).subscribe((resp) => {
          if(resp.status == 200){
            this.userData = resp.body;
            this.currentUserId = this.userData.userId;
            console.log(this.currentUserId);
          }        
        });
      }
    });
  }
}
