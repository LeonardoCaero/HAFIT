import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
      featuredImage:''
    });
    
  }
  plans :IPlan [] = [];
  plan: any = {};
 

  // deletePlan(): void {
  //   const planId = this.route.snapshot.paramMap.get('planId');
  //   this.planServices.deletePlan('planId', planId).subscribe(
  //     () => console.log(`Eliminado correctamente`),
  //     error => console.error(error)
  //   );
  // }

deletePlan(): void {
  if (confirm('Are you sure?')) {
  const planId = this.route.snapshot.paramMap.get('planId');
  this.planServices.deletePlan('planId',planId).subscribe(
    () => console.log(`Eliminado correctamente`),
    error => console.log()
  );
  }
}

    
  ngOnInit(): void {
    const planId = this.route.snapshot.paramMap.get('planId');
    this.planServices.getPlan("planId",planId).subscribe(
      (data) => {
        this.plan = data.body;  
        this.myForm = this.formBuilder.group({//Poner los datos del plan en el formulario
          name: [this.plan.name],
          description: [this.plan.description], 
          featuredImage:[this.plan.featuredImage]
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
    var name = this.myForm.get('name'); //GET VALUES
    var description = this.myForm.get('description');
    var featuredImage = this.myForm.get('featuredImage');
    const planId = this.route.snapshot.paramMap.get('planId');


    if (name) {formData.append("name", name.value)} ;
    if (description) {formData.append("description", description.value)};
    if (featuredImage) {this.planServices.uploadImage(featuredImage.value).subscribe({//FIRST UPLOAD THE FEATURED IMAGE TO CLOUDINARY
      next: (data) => {
        console.log('Data: '+data)
          this.plan.featuredImage = data
          console.log(this.plan.featuredImage)
          formData.append("featuredImage",this.plan.featuredImage)

          this.planServices.updatePlans(planId,formData).subscribe({//IF IT'S ALL OK UPDATE PLAN
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
      },
        error: (error) => {//MANAGE ERROR
          if (error.status >= 500) {
            console.error('An error occurred:', error.error);
            this.errorMessage = error.error;
          } else {
            console.log(`Backend returned code ${error.status}, body was: `, error.error);
          }
    
        }
        
    })}else{//IF THERE ISN'T FEATURED IMAGE UPLOAD THE PLAN
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
    
    console.log(this.plan.featuredImage)
  
    

}

}
