import { Component, OnInit } from '@angular/core';
import { PlanDataService } from '../services/plan-data.service';
import { IPlan } from '../interfaces/iplan';


@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit{

  constructor(private planSerivce: PlanDataService){}
  ngOnInit(): void {
   this.planSerivce.getPlans().subscribe(resp=>{
    if (resp.body != null) {
      console.log(resp.body);
      this.plans = resp.body;
    }
   })
  }
plans: IPlan[] = [];
}
