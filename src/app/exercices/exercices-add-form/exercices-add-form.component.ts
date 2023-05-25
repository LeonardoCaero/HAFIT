import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      console.error('Error creating ckeditor instance', error);
    });
  this.authService.checkUser().subscribe(
    (response)=>{
      if (response.userResponse.type != 'soci') {
        this.router.navigate(['subscribe-to-soci'])
      }
    },(error)=>{
      this.router.navigate(['subscribe-to-soci'])
    }
  )
  this.myForm = this.formBuilder.group({
    name: ['',[Validators.required,Validators.maxLength(15),Validators.minLength(2)]],
    time: ['',[Validators.required,Validators.pattern('^[0-9]+$')]],
    description: ['',Validators.required],
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
        const userId = response.userResponse.userId
        const user_id = response.userResponse._id

        this.uploadService.uploadImage(this.formdata).subscribe(
          response =>{
            console.log(response);
            
           this.exerciceServices.addExercice(name,this.editorInstance.getData(),response.secure_url,time).subscribe(
            response=>{
              console.log(response)
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
              console.log('Error en el update:  ',error.error)
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
        const userId = response.userResponse.userId;//ID AUTOINCREMENT
        const user_id = response.userResponse._id//ID DEFAULT DE MONGO
        console.log(userId)
        if (response.type === "soci") {
          this.exerciceServices.addExercice(name,'default',response.secure_url,time).subscribe(
            response =>{   
              this.exerciceServices.updateUser(user_id,response.body.exerciceId).subscribe(
                response =>{
                  console.log('No img updated'); 
                },error=>{
                  this.errorMessage = error.error
                }
              )          
            this.userService.updateExercice(user_id,response.body.exerciceId).subscribe(
              response =>{
                this.router.navigate(['exercices']);
              },error=>{
                this.errorMessage = error.errorMessage
              }
            )},error =>{
              console.log(`Error en update user: ${error.errorMessage}`)
              this.errorMessage = error.error;
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
}
}

