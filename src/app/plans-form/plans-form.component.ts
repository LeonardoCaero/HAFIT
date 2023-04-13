import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { IPlan } from '../interfaces/iplan';
import { PlanDataService } from '../services/plan-data.service';


@Component({
  selector: 'app-plans-form',
  templateUrl: './plans-form.component.html',
  styleUrls: ['./plans-form.component.scss']
})

export class PlansFormComponent implements OnInit {
  constructor( private planServices: PlanDataService,private router:Router,  private route: ActivatedRoute,private formBuilder:FormBuilder){
    this.myForm = this.formBuilder.group({//Inicializar formulario vacio para que no de error
      name: '',
      description: '',
    });
    
  }
  plans :IPlan [] = [];
  plan: any = {};
 

  deletePlan(): void {
    const planId = this.route.snapshot.paramMap.get('planId');
    this.planServices.deletePlan('planId', planId).subscribe(
      () => console.log(`Eliminado correctamente`),
      error => console.error(error)
    );
  }
  
  ngOnInit(): void {
    const planId = this.route.snapshot.paramMap.get('planId');
    this.planServices.getPlan("planId",planId).subscribe(
      (data) => {
        this.plan = data.body;  
        this.myForm = this.formBuilder.group({//Poner los datos del plan en el formulario
          name: [this.plan.name],
          description: [this.plan.description]
        });
      },
      (error) => {
        this.errorMessage = error.message;
      }
    );
  }

  
  myForm:FormGroup;
  errorMessage:String = '';

  onSubmit(plan:any):void{
    let formData = new FormData();
    var name = this.myForm.get('name'); 
    var description = this.myForm.get('description');
    const planId = this.route.snapshot.paramMap.get('planId');
   
    if (name) {formData.append("name", name.value)} ;
    if (description) {formData.append("description", description.value)};

    console.log(formData.get('name'))
    this.planServices.updatePlans(planId,formData).subscribe({
      next: (data) => {
        this.router.navigate(['plans']);
      },
        error: (error) => {
          if (error.status >= 500) {
            console.error('An error occurred:', error.error);
            this.errorMessage = error.error;
          } else {
            console.log(
              `Backend returned code ${error.status}, body was: `, error.error);
          }

        }
    });

}
}
