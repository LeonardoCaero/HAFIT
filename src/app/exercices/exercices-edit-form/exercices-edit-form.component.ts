import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Iexercice } from 'src/app/interfaces/iexercice';
import { ExerciceDataService } from 'src/app/services/exercice-data.service';

@Component({
  selector: 'app-exercices-edit-form',
  templateUrl: './exercices-edit-form.component.html',
  styleUrls: ['./exercices-edit-form.component.scss']
})
export class ExercicesEditFormComponent {
  constructor( private exerciceServices: ExerciceDataService,private router:Router,  private route: ActivatedRoute,private formBuilder:FormBuilder){
    this.myForm = this.formBuilder.group({//Inicializar formulario vacio para que no de error
      name: '',
      description: '',
      time: ''
    });
    
  }
  exercices :Iexercice [] = [];
  exercice: any = {};
 

  // deletePlan(): void {
  //   const planId = this.route.snapshot.paramMap.get('planId');
  //   this.planServices.deletePlan('planId', planId).subscribe(
  //     () => console.log(`Eliminado correctamente`),
  //     error => console.error(error)
  //   );
  // }

deleteExercice(): void {
  if (confirm('Are you sure?')) {
  const exerciceId = this.route.snapshot.paramMap.get('exerciceId');
  this.exerciceServices.deleteExercice('exerciceId',exerciceId).subscribe(
    () => console.log(`Eliminado correctamente`),
    error => console.log()
  );
  }
}

    
  ngOnInit(): void {
    const exerciceId = this.route.snapshot.paramMap.get('exerciceId');
    this.exerciceServices.getExercice("exerciceId",exerciceId).subscribe(
      (data) => {
        this.exercice = data.body;  
        this.myForm = this.formBuilder.group({//Poner los datos del plan en el formulario
          name: [this.exercice.name],
          description: [this.exercice.description] ,
          time: [this.exercice.time] 
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
    var time = this.myForm.get('time');
    const exerciceId = this.route.snapshot.paramMap.get('exerciceId');
   
    if (name) {formData.append("name", name.value)} ;
    if (description) {formData.append("description", description.value)};
    if (time) {formData.append("time", time.value)};

    console.log(formData.get('name'))
    this.exerciceServices.updateExercice(exerciceId,formData).subscribe({
      next: (data) => {
        this.router.navigate(['exercices']);
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