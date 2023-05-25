import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { UserDataService } from './user-data.service';
import { Observable, from, take, switchMap, map, catchError, of } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  userData!: any;
  constructor(
    private auth: AuthService,
    @Inject(DOCUMENT) private document: Document,
    private userService: UserDataService,
  ) {}


  login() {
    this.auth.loginWithRedirect();
  }

  logout() {
    this.auth.logout();
  }

  checkUser(): Observable<any> {
  return this.auth.user$.pipe(
    take(1),
    switchMap((user) => {
      if (user) {
        return this.userService.getUser('email', user.email).pipe(
          switchMap((resp) => {
            console.log('Token: ',resp.body.auth_token);
            
            if (resp.status === 200) {
              return this.userService.tokenGenerate(user.sub).pipe(
                map((tokenResp) => {
                  const combinedResponse = {
                    userResponse: resp.body,
                    token: tokenResp.body.token
                  };
                  return combinedResponse;
                })
              );
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

export { AuthService };
