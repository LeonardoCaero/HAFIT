import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from '../services/user-data.service';
import { AuthServiceService } from '../services/auth-service.service';
import { IUser } from '../interfaces/iuser';
import { ICreateOrderRequest } from "ngx-paypal";

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
    public payPalConfig: any;
    public showPaypalButtons: boolean | undefined;
    user : IUser ={name: '',email:'', type:'soci',products:[],plans:[]};
    id: any;
  ngOnInit():void{
    const subscribeBtn = this.elementRef.nativeElement.querySelector('#subscribeBtn')
    const cancelBtn = this.elementRef.nativeElement.querySelector('#cancelBtn')
    
    this.authService.checkUser().subscribe( 
      (response)=>{
        this.id = response.userId
      }
    )
    // subscribeBtn.addEventListener('click',  () => {
    //   this.authService.checkUser().subscribe( 
    //     (response)=>{
    //       console.log(response.userId)
    //       this.user.userId = response.userId;
    //       this.id = response.userId
    //       const userUpdated = this.user
    //       console.log(userUpdated)
    //       this.userService.updateUserType(userUpdated).subscribe(//ACTUALIZAR A SOCI
    //         (response)=>{
    //          this.router.navigate(['plans/add']);
    //         },(error)=>{
    //           console.log(`No se puede actualizar el ususario ${error.errorMessage}`)
    //         }
    //       )
    //     },(error)=>{
    //      this.authService.login()
    //       console.log(`Error checkuser ${error.error}`)
    //     }
    //   )

    // })

    cancelBtn.addEventListener('click',()=>{
      this.router.navigate(['plans'])
    })
    this.payPalConfig = {
      currency: "EUR",
      clientId: "ASyI_eXRoPpdyyRE7YZyDtQ9kgWP6qAqhkU5mJc8LZy-8nGmuB9xxN9-RFgWejyAMAGh1TAvCssrowEO",
      createOrder: (data:any) =>
        <ICreateOrderRequest>{
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "EUR",
                value: "50.00",
                breakdown: {
                  item_total: {
                    currency_code: "EUR",
                    value: "50.00"
                  }
                }
              },
              items: [
                {
                  name: "HAFIT PREMIUM",
                  quantity: "1",
                  category: "DIGITAL_GOODS",
                  unit_amount: {
                    currency_code: "EUR",
                    value: "50.00"
                  }
                }
              ]
            }
          ]
        },
      advanced: {
        commit: "true"
      },
      style: {
        label: "paypal",
        layout: "vertical"
      },
      onApprove: (data:any, actions:any) => {
        console.log(
          "onApprove - transaction was approved, but not authorized",
          data,
          actions
        );
        actions.order.get().then((details:any) => {
          console.log(
            "onApprove - you can get full order details inside onApprove: ",
            details
          );
        });
      },
      onClientAuthorization: (data:any) => {
        
        this.userService.updateUserType(this.id,'soci').subscribe(//ACTUALIZAR A SOCI
            (response)=>{
             this.router.navigate(['exercices/add']);
            },(error)=>{
              console.log(`No se puede actualizar el ususario ${error.error}`)
            }
          )
     
        console.log(
          "onClientAuthorization - you should probably inform your server about completed transaction at this point",
          data
        );
        
      },
      onCancel: (data:any, actions:any) => {
        console.log("OnCancel", data, actions);
      },
      onError: (err:any) => {
        console.log("OnError", err);
      },
      onClick: (data:any, actions:any) => {
        console.log("onClick", data, actions);
      }
    };
  }
 
  pay() {
    this.showPaypalButtons = true;
  }
 
  back(){
    this.showPaypalButtons = false;
  }
  }



   

