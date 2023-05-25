import { Component, OnInit } from '@angular/core';
import { PlanDataService } from '../services/plan-data.service';
import { IPlan } from '../interfaces/iplan';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthServiceService } from '../services/auth-service.service';
import { UserDataService } from '../services/user-data.service';
import { IUser } from '../interfaces/iuser';



@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit{



  constructor(private planSerivce: PlanDataService,
    private sanitizer: DomSanitizer,
    private authService : AuthServiceService,
    private userService: UserDataService){

      
  }


  ngOnInit(): void {
    // this.authService.checkUser().subscribe(
    //   response =>{
    //     //  console.log(response);
    //     let token  = response.token
    //     let userId = response.userResponse.auth_token
    //     // console.log('View plans ',response);
        
    //     this.planSerivce.getPlans().subscribe(resp=>{
    //       if (resp.body.data !=null) {
    //         this.plans = resp.body.data

    //       }
    //       this.plans.forEach(plan => {
    //         if (plan.featuredImg === 'default') {
    //           plan.featuredImg = environment.defaultImage;
    //         }else if(plan.featuredImg == 'null'){//SI FEATUREDIMG ES NULL LO ELIMINA DE LA BBDD
    //           console.log(plan.planId)
    //           this.planSerivce.deletePlan('planId',plan.planId).subscribe(
    //             (response)=>{},error =>{}
    //           )
    //         }
    //       });
          
    //     })
    //     this.userService.getUser('_id',response.userResponse._id).subscribe(
    //       response=>{
    //         this.userType = response.body.type
    //       }
    //     )

        
    //   }
    // )
   this.planSerivce.getPlans().subscribe(resp=>{
    if (resp.body != null) {
      console.log(resp.body);
      this.plans = resp.body;
      this.authService.checkUser().subscribe(//MIRA EL USER LOGGEADO 
        resp=>{
          console.log(resp._id)
          this.user = resp.userResponse._id
          this.userService.getUser('_id',resp.userResponse._id).subscribe(
            response =>{
              this.userType = response.body.type
              console.log(response.body.type)
            }
          )
        }
      )
      this.plans.forEach(plan => {
        if (plan.featuredImg === 'default') {
          plan.featuredImg = environment.defaultImage;
        }else if(plan.featuredImg == 'null'){//SI FEATUREDIMG ES NULL LO ELIMINA DE LA BBDD
          console.log(plan.planId)
          this.planSerivce.deletePlan('planId',plan.planId).subscribe(
            (response)=>{},error =>{}
          )
        }
      });
    }
   })

  }
  onDeletePlan(plan: IPlan): void {
    this.plans = this.plans.filter(
      (p) => p.planId !== plan.planId
    );
  }
  plans: IPlan[] = [];
  user: any = {};
  userType: any

}
