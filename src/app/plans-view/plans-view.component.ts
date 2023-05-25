import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IPlan } from '../interfaces/iplan';
import { PlanDataService } from '../services/plan-data.service';
import { environment } from 'src/environments/environment';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-plans-view',
  templateUrl: './plans-view.component.html',
  styleUrls: ['./plans-view.component.scss']
})
export class PlansViewComponent {
  errorMessage: string = '';
  plan : IPlan | null = null;
  defaultImage = environment.defaultImage
  constructor( private planServices: PlanDataService, private route: ActivatedRoute,private authService : AuthServiceService,){

  }
 
  ngOnInit(): void {
    const planId = this.route.snapshot.paramMap.get('planId');
    this.planServices.getPlan('planId',planId).subscribe(
      (data) => {
        this.plan = data.body;  
      },
      (error) => {
        this.errorMessage = error.message;
      }
    );
    this.authService.checkUser().subscribe(//MIRA EL USER LOGGEADO 
    resp=>{
      console.log(resp._id)
      this.user = resp.userResponse._id
    }
  )
  }
  user: any = {};
}
