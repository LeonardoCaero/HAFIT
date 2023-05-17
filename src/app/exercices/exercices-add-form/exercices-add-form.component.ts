import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Iexercice } from 'src/app/interfaces/iexercice';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ExerciceDataService } from 'src/app/services/exercice-data.service';

@Component({
  selector: 'app-exercices-add-form',
  templateUrl: './exercices-add-form.component.html',
  styleUrls: ['./exercices-add-form.component.scss']
})
export class ExercicesAddFormComponent {

  myForm:FormGroup;
  errorMessage:String = '';
  constructor( private exerciceServices: ExerciceDataService,private router:Router,  private route: ActivatedRoute,private formBuilder:FormBuilder, private authService: AuthServiceService){
    this.myForm = new FormGroup({

    });
   
}
public Editor = ClassicEditor;

exercices :Iexercice [] = [];
exercice: any = {};

ngOnInit(): void {
  this.authService.checkUser().subscribe(
    (response)=>{
      if (response.type != 'soci') {
        this.router.navigate(['subscibe-to-soci'])
      }
    },(error)=>{
      this.router.navigate(['subscibe-to-soci'])
    }
  )
  this.myForm = this.formBuilder.group({
    name: '',
    time: '',
    description: '',
    featuredImg: ''
  });
}

base64Img: string = '';
isFileReaderBusy = false;
onFileSelected(event: any) {
  const file: File = event.target.files[0];

  if (!this.isFileReaderBusy) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    this.isFileReaderBusy = true;
    reader.onload = () => {
      this.base64Img = reader.result as string;
      this.isFileReaderBusy = false;
      console.log(this.base64Img)
    };
  }
}



onSubmit(exercice:any):void{
  let formData = new FormData();
  var name = this.myForm.get('name'); //Obtener valores del formulario
  var description = this.myForm.get('description');
  var time = this.myForm.get('time');
  var featuredImage = this.base64Img;

  if (name) {formData.append("name", name.value)} ;// Si name tiene valor añadirlo al formdata
  if(time){formData.append('time',time.value)};
  if (description) {formData.append("description", description.value)};
  if (featuredImage) {
    
  }
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

