import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Iexercice } from 'src/app/interfaces/iexercice';
import { ExerciceDataService } from 'src/app/services/exercice-data.service';

@Component({
  selector: 'app-exercices-add-form',
  templateUrl: './exercices-add-form.component.html',
  styleUrls: ['./exercices-add-form.component.scss']
})
export class ExercicesAddFormComponent {

  myForm:FormGroup;
  errorMessage:String = '';
  constructor( private exerciceServices: ExerciceDataService,private router:Router,  private route: ActivatedRoute,private formBuilder:FormBuilder){
    this.myForm = new FormGroup({

    });
   
}
exercices :Iexercice [] = [];
exercice: any = {};
ngOnInit(): void {
  this.myForm = this.formBuilder.group({
    name: '',
    time: '',
    description: ''
  });
}




onSubmit(exercice:any):void{
  let formData = new FormData();
  var name = this.myForm.get('name'); //Obtener valores del formulario
  var description = this.myForm.get('description');
  var time = this.myForm.get('time');
  
  if (name) {formData.append("name", name.value)} ;// Si name tiene valor añadirlo al formdata
  if(time){formData.append('time',time.value)};
  if (description) {formData.append("description", description.value)};

  this.exerciceServices.addExercice(formData).subscribe({//Crear el plan con los datos de formdata
    next: (data) => {// si es ok vuelve a plans
      this.router.navigate(['exercies']);
    },
      error: (error) => {
        if (error.status >= 500) {//Si hay un error de 500 hacia arriba muestra el error 
          console.error('An error occurred:', error.error);
          this.errorMessage = error.error;
        } else if(error.status === 201){
            this.router.navigate(['exercices']);// Si es ok vuelve a plans
        }else{
          console.log(
            `Backend returned code ${error.status}, body was: `, error.error);
        }

      }
  });
}
}

