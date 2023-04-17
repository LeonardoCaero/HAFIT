import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { UserDataService } from './user-data.service';
import { Observable, from, take, switchMap, map } from 'rxjs';

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

  checkUser(): Observable<string> {
    return this.auth.user$.pipe(
      take(1),
      switchMap((user) => {
        if (user) {
          return this.userService.getUser('email', user.email).pipe(
            map((resp) => {
              if (resp.status === 200) {
                return resp.body.userId.toString();
              } else {
                throw new Error('Error obteniendo userId');
              }
            })
          );
        } else {
          throw new Error('Usuario no autenticado');
        }
      })
    );
  }
  
  
}
