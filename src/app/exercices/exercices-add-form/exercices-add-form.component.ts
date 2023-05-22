import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Iexercice } from 'src/app/interfaces/iexercice';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ExerciceDataService } from 'src/app/services/exercice-data.service';
import { ImageUploadServiceService } from 'src/app/services/image-upload-service.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-exercices-add-form',
  templateUrl: './exercices-add-form.component.html',
  styleUrls: ['./exercices-add-form.component.scss']
})
export class ExercicesAddFormComponent {

  myForm:FormGroup;
  errorMessage:String = '';
  fileName: any;
  formdata: FormData = new FormData();
  constructor( private exerciceServices: ExerciceDataService,
    private router:Router,
    private route: ActivatedRoute,
    private formBuilder:FormBuilder, 
    private authService: AuthServiceService,
    private elementRef :ElementRef,
    private uploadService: ImageUploadServiceService,
    private userService: UserDataService,){
    this.myForm = new FormGroup({

    });
   
}
public Editor = ClassicEditor;

exercices :Iexercice [] = [];
exercice: any = {};
editorInstance: any;

ngOnInit(): void {
  ClassicEditor.create(this.elementRef.nativeElement.querySelector('#editor'), {
    cloudServices: {
      tokenUrl: 'https://97727.cke-cs.com/token/dev/U1ePTKYik4hYbvLo1lTt33V88qVxgg9iXIGp?limit=10',
      uploadUrl: 'https://97727.cke-cs.com/easyimage/upload/'
    }
  })
    .then(editor => {
      this.editorInstance = editor;
    })
    .catch(error => {
      console.error('Error creating ckeditor instance', error.errorMessage);
    });
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



onFileSelected(event: any) {
  const file: File = event.target.files[0];
  if (file) {
    this.fileName = file;
    this.formdata.append("file", file); 
    this.formdata.append('upload_preset','plan-preset')  
    this.formdata.append('cloud_name',environment.CLOUD_NAME)
  }
}



onSubmit(exercice:any):void{
  let formData = new FormData();
  var name = this.myForm.get('name')?.value; //Obtener valores del formulario
  var description = this.myForm.get('description')?.value;
  var time = this.myForm.get('time')?.value;
  var featuredImage = this.fileName;

  if (name) {formData.append("name", name.value)} ;// Si name tiene valor añadirlo al formdata
  if(time){formData.append('time',time.value)};
  if (description) {formData.append("description", description.value)};
  if (featuredImage) {
    this.authService.checkUser().subscribe(
      response =>{
        const userId = response.userId
        const user_id = response._id

        this.uploadService.uploadImage(this.formdata).subscribe(
          response =>{
           this.exerciceServices.addExercice(name,this.editorInstance.getData(),response.secure_url,time).subscribe(
            response=>{
              this.exerciceServices.updateUser(user_id,response.body.exerciceId).subscribe(
                response =>{
                  console.log('exercice añadido');
                  
                },error=>{
                  console.log(`Error update exercice ${error.error}`);
                  this.errorMessage = error.errorMessage
                }
              )
              this.userService.updateExercice(userId,response.body.exerciceId).subscribe(
                response =>{
                  this.router.navigate(['exercices'])
                },
                error =>{
                  console.log(`error Update errors ${error.error}`);
                  this.errorMessage = error.errorMessage
                  
                }
              )
            },
            error=>{
              console.log('Error subiendo la imagen a cloudinary: ',error.error)
              this.errorMessage = error.error;
            }
           )
          },
          error =>{
            console.log('Error auth:', error.error)
              this.errorMessage = error.error;
          }
        )
      }
    )
  }else if(!featuredImage){
    this.authService.checkUser().subscribe(
      response =>{
        const userId = response.userId;//ID AUTOINCREMENT
        const user_id = response._id//ID DEFAULT DE MONGO
        console.log(userId)
        if (response.type === "soci") {
          this.exerciceServices.addExercice(name,'default',response.secure_url,time).subscribe(
            response =>{
              console.log('No img updated');
            },error =>{
              console.log(`Error en update user: ${error.errorMessage}`)
              this.errorMessage = error.error;
            }
          )
          this.userService.updateExercice(userId,response.body.exerciceId).subscribe(
            response =>{
              this.router.navigate(['exercices']);
            },error=>{
              this.errorMessage = error.errorMessage
            }
          )
        }else{
          console.log('No eres soci');
        }
      },error=>{
        console.log('error auth', error.error);
        
      }
    )
  }
//   this.exerciceServices.addExercice(formData).subscribe({//Crear el plan con los datos de formdata
//     next: (data) => {// si es ok vuelve a plans
//       this.router.navigate(['exercies']);
//     },
//       error: (error) => {
//         if (error.status >= 500) {//Si hay un error de 500 hacia arriba muestra el error 
//           console.error('An error occurred:', error.error);
//           this.errorMessage = error.error;
//         } else if(error.status === 201){
//             this.router.navigate(['exercices']);// Si es ok vuelve a plans
//         }else{
//           console.log(
//             `Backend returned code ${error.status}, body was: `, error.error);
//         }

//       }
//   });
}
}

