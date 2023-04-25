import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CloudinaryImage } from '@cloudinary/url-gen';
import { Cloudinary } from '@cloudinary/angular-5.x';

import { IPlan } from '../interfaces/iplan';
import { PlanDataService } from '../services/plan-data.service';
import { FileUploader } from 'ng2-file-upload';




@Component({
  selector: 'app-plans-add-form',
  templateUrl: './plans-add-form.component.html',
  styleUrls: ['./plans-add-form.component.scss']
})
export class PlansAddFormComponent {
  myForm:FormGroup;
  errorMessage:String = '';
  featuredImg!: CloudinaryImage;
  myWidget:any;
  // public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'photo' });
  constructor( private planServices: PlanDataService,private router:Router,  private route: ActivatedRoute,private formBuilder:FormBuilder){
    this.myForm = new FormGroup({

    });
   
}

plans :IPlan [] = [];
plan: any = {};

ngOnInit(): void {
  this.myForm = this.formBuilder.group({
    name: '',
    description: '',
    featuredImage: ''
  });

// let cloud = new Cloudinary({
//   cloud: {
//     cloudName: 'dlomgjt1k',
//   }
// });

// this.featuredImg = cloud.image('plans');
}

openWidget(): void{
  this.myWidget.open();
}

onSubmit(plan:any):void{

  let formData = new FormData();
  var name = this.myForm.get('name'); //Obtener valores del formulario
  var description = this.myForm.get('description');
  var featuredImage = this.myForm.get('featuredImage');

  let url = this.planServices.uploadImage(featuredImage?.value).subscribe({
    next: (data) => {
      this.plan.featuredImage = data.url
      console.log(data.body)
    },
      error: (error) => {
        if (error.status >= 500) {
          console.error('An error occurred:', error.error);
          this.errorMessage = error.error;
        } else {
          console.log(`Backend returned code ${error.status}, body was: `, error.error);
        }
  
      }
  })

  if (name) {formData.append("name", name.value)} ;// Si name tiene valor añadirlo al formdata
  if (description) {formData.append("description", description.value)};
  if (featuredImage) {formData.append('featuredImg',url.toString())}

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
