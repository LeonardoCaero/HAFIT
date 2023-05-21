import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from '../services/user-data.service';
import { AuthServiceService } from '../services/auth-service.service';
import { IUser } from '../interfaces/iuser';

@Component({
  selector: 'app-soci-subscribe',
  templateUrl: './soci-subscribe.component.html',
  styleUrls: ['./soci-subscribe.component.scss']
})
export class SociSubscribeComponent {

  constructor(
    private router: Router,
    private userService:UserDataService, 
    private elementRef :ElementRef,
    private authService:AuthServiceService,
    ){}
    user : IUser ={name: '',email:'', type:'soci',products:[],plans:[]};
  ngOnInit():void{
    const subscribeBtn = this.elementRef.nativeElement.querySelector('#subscribeBtn')
    const cancelBtn = this.elementRef.nativeElement.querySelector('#cancelBtn')
    
    subscribeBtn.addEventListener('click',  () => {
      this.authService.checkUser().subscribe( 
        (response)=>{
          console.log(response.userId)
          this.user.userId = response.userId;
          
          const userUpdated = this.user
          console.log(userUpdated)
          this.userService.updateUserType(userUpdated).subscribe(//ACTUALIZAR A SOCI
            (response)=>{
             this.router.navigate(['plans/add']);
            },(error)=>{
              console.log(`No se puede actualizar el ususario ${error.errorMessage}`)
            }
          )
        },(error)=>{
         this.authService.login()
          console.log(`Error checkuser ${error.error}`)
        }
      )

    })

    cancelBtn.addEventListener('click',()=>{
      this.router.navigate(['plans'])
    })
  }
}


   

