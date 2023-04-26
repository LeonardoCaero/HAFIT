import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IPlan } from '../interfaces/iplan';
import { PlanDataService } from '../services/plan-data.service';

@Component({
  selector: 'app-plans-view',
  templateUrl: './plans-view.component.html',
  styleUrls: ['./plans-view.component.scss']
})
export class PlansViewComponent {
  errorMessage: string = '';
  plan : IPlan | null = null;

  constructor( private planServices: PlanDataService, private route: ActivatedRoute){

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
  }

}
