import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IPlan } from '../interfaces/iplan';
import { PlanDataService } from '../services/plan-data.service';

@Component({
  selector: 'app-plans-form',
  templateUrl: './plans-form.component.html',
  styleUrls: ['./plans-form.component.scss']
})
export class PlansFormComponent {
  constructor( private planServices: PlanDataService,private router:Router,private formBuilder:FormBuilder){
    this.myForm = new FormGroup({
    });
  }
  plans :IPlan [] = [];
  plan: any = {};

  getPlan():void{
    const planId = this.myForm.get('planId');
    this.planServices.getPlan(planId)
    .subscribe(data => {
      this.plan = data;
      console.log(data.body)
    });
  }
  deletePlan():void{
    const planId = this.plan.planId;
    this.planServices.deletePlan('planId',planId).subscribe(() => console.log(`Eliminat correctament`),
    error => console.error(error) )
  }
  ngOnInit(): void {
    if (this.plan && this.plan.planId) { // comprobar si plan está definido
      console.log(this.plan.planId);
      this.myForm = this.formBuilder.group({
        name: [this.plan.name],
        planId: [this.plan.planId],
        description: [this.plan.description]
      });
    }
  }
  

  myForm:FormGroup;
  errorMessage:String = '';


  onSubmit(plan:any):void{
    const formData = new FormData();
    var name = this.myForm.get('name'); 
    var description = this.myForm.get('description');


    if (name) {formData.append("name", name.value)};
    if (description) {formData.append("description", description.value)};


    this.planServices.updatePlans(formData).subscribe({
      next: (data) => {
        // naveguem a la ruta compte-list
        this.router.navigate(['plans']);
      },
        error: (error) => {
          // interpolem a la vista error.message
          if (error.status === 0) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.error(
              `Backend returned code ${error.status}, body was: `, error.error);
          }

        }
    });

}
}
