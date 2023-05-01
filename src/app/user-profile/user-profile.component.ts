import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';
import { UserDataService } from '../services/user-data.service';
import { IUser } from '../interfaces/iuser';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  providers: [AuthServiceService]
})
export class UserProfileComponent implements OnInit {
  public userProfile: any;
  constructor(public auth: AuthService, private userService: UserDataService) {}

  ngOnInit(): void {
    this.auth.user$.subscribe((user: User | null | undefined) => {
      if (user?.email) {
        this.userService.getUser('email', user.email).subscribe((resp) => {          
          if (resp.status === 200) {
            this.userData = resp.body;

            // Comparar los datos del usuario autenticado con los datos de la base de datos
            if (this.userData.name !== user.name) {
              // Actualizar el nombre en la base de datos
              const updatedUser: IUser = {
                userId: this.userData.userId,
                email: user.email,
                name: `${user.name != undefined ? user.name : this.userData.name} ${user.family_name}`,
                type:
                  this.userData.userId == 1 || this.userData.userId == 2
                    ? 'admin'
                    : 'client',
                products: this.userData.products || [],
              };
              this.userService.updateUser(updatedUser).subscribe((resp) => {
                console.log(resp);
                this.userData = resp.body;
              });
            }
          }
        }, (error) => {

          if(error.status === 404){
            const newUser: IUser = {
              email: user.email,
              name: user.name,
              type: 'client',

            };
            this.userService.addUser(newUser).subscribe((resp) => {        
              this.userData = resp.body;
            });
          }
        });
      }
    });
  }

  userData!: IUser;
}