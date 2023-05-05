import { Component, OnInit } from '@angular/core';
import { PlanDataService } from '../services/plan-data.service';
import { IPlan } from '../interfaces/iplan';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthServiceService } from '../services/auth-service.service';



@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit{



  constructor(private planSerivce: PlanDataService,private sanitizer: DomSanitizer, private authService : AuthServiceService){

      
  }

  ngOnInit(): void {
   this.planSerivce.getPlans().subscribe(resp=>{
    if (resp.body != null) {
      console.log(resp.body);
      this.plans = resp.body;
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

}
