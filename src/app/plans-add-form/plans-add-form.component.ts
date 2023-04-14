import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IPlan } from '../interfaces/iplan';
import { PlanDataService } from '../services/plan-data.service';

@Component({
  selector: 'app-plans-add-form',
  templateUrl: './plans-add-form.component.html',
  styleUrls: ['./plans-add-form.component.scss']
})
export class PlansAddFormComponent {
  myForm:FormGroup;
  errorMessage:String = '';
  constructor( private planServices: PlanDataService,private router:Router,  private route: ActivatedRoute,private formBuilder:FormBuilder){
    this.myForm = new FormGroup({

    });
   
}
plans :IPlan [] = [];
plan: any = {};
ngOnInit(): void {
  this.myForm = this.formBuilder.group({
    name: '',
    description: ''
  });
}




onSubmit(plan:any):void{
  let formData = new FormData();
  var name = this.myForm.get('name'); //Obtener valores del formulario
  var description = this.myForm.get('description');
  
  if (name) {formData.append("name", name.value)} ;// Si name tiene valor añadirlo al formdata
  if (description) {formData.append("description", description.value)};

  this.planServices.addPlan(formData).subscribe({//Crear el plan con los datos de formdata
    next: (data) => {// si es ok vuelve a plans
      this.router.navigate(['plans']);
    },
      error: (error) => {
        if (error.status >= 500) {//Si hay un error de 500 hacia arriba muestra el error 
          console.error('An error occurred:', error.error);
          this.errorMessage = error.error;
        } else if(error.status === 201){
            this.router.navigate(['plans']);// Si es ok vuelve a plans
        }else{
          console.log(
            `Backend returned code ${error.status}, body was: `, error.error);
        }

      }
  });
}
}
