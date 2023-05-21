import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup,Validator, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { IPlan } from '../interfaces/iplan';
import { PlanDataService } from '../services/plan-data.service';
import { AuthServiceService } from '../services/auth-service.service';
import { UserDataService } from '../services/user-data.service';
import { environment } from 'src/environments/environment';
import { ImageUploadServiceService } from '../services/image-upload-service.service';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';




@Component({
  selector: 'app-plans-add-form',
  templateUrl: './plans-add-form.component.html',
  styleUrls: ['./plans-add-form.component.scss'],
  providers: [ImageUploadServiceService]
})
export class PlansAddFormComponent {

  myForm: FormGroup;
  errorMessage: String = '';
  fileName :any;
  public Editor = ClassicEditor;


  editorInstance: any;
  
  constructor(
    private planServices: PlanDataService,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthServiceService,
    private userService: UserDataService,
    private uploadService: ImageUploadServiceService,
    private elementRef :ElementRef) {
    this.myForm = new FormGroup({

    });

  }

  plans: IPlan[] = [];
  plan: any = {};

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
        if (response.type != 'soci') {
          this.router.navigate(['subscibe-to-soci'])
        }
      },(error)=>{
        this.router.navigate(['subscibe-to-soci'])
      }
    )
    this.myForm = this.formBuilder.group({
      name: ['',[Validators.required,Validators.maxLength(15),Validators.minLength(2)]],
      description: ['',Validators.required],
      featuredImg: ''
    });
  }
loading:boolean = false

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file;
      this.formdata.append("file", file); 
      this.formdata.append('upload_preset','plan-preset')  
      this.formdata.append('cloud_name',environment.CLOUD_NAME)
    }
  }

  description:string = ''

formdata: FormData = new FormData();

  onSubmit(plan: any){
   let  formData = new FormData()
   var name = this.myForm.get('name')?.value; //Obtener valores del formulario
   var description = this.myForm.get('description')?.value;
   var featuredImage = this.fileName;

  if (description) { formData.append("description", description.value) };
    if (featuredImage) { 
          this.authService.checkUser().subscribe(
            (response) => {
              const userId = response.userId;//ID AUTOINCREMENT
              const user_id = response._id//ID DEFAULT DE MONGO
              this.uploadService.uploadImage(this.formdata).subscribe(
                response=>{
                  this.loading = true
              this.planServices.addPlan(name, response.secure_url, this.editorInstance.getData()).subscribe(
                (response) => {
                  console.log('ok')
                  this.planServices.updateUser(user_id, response.body.planId).subscribe(
                    (response) => {
                      console.log('AÑADIDO')

                    }, (error) => {
                      console.log(`Error en update user: ${error.error}`)
                      this.errorMessage = error.error;
                    }
                  )
                  this.userService.updatePlan(userId, response.body.planId).subscribe(
                    (reponse) => {
                      this.router.navigate(['plans']);
                    },
                    (error) => {
                      console.log('Update plans error: ', error.error)
                      this.errorMessage = error.error;
                    }
                  )
                },
                (error) => {
                  this.errorMessage = error.error;
                }
              )
            }, error =>{
              console.log('Error subiendo la imagen a cloudinary: ',error.error)
              this.errorMessage = error.error;
            }
            )
            }, (error) => {
              console.log('Error auth:', error.error)
              this.errorMessage = error.error;
            }

          )
    }else if (!featuredImage){
    this.authService.checkUser().subscribe(
      (response) => {
        const userId = response.userId;//ID AUTOINCREMENT
        const user_id = response._id//ID DEFAULT DE MONGO
        console.log(userId)
        if (response.type === "soci") {
              this.planServices.addPlan(name, 'default',this.editorInstance.getData()).subscribe(//AFEGIR NOU PLAN
                (response) => {
                  this.planServices.updateUser(user_id, response.body.planId).subscribe(//AÑADIR _ID DEL USER AL PLAN
                    (response) => {
                      console.log('NO IMAGEN UPDATED')
                    }, (error) => {
                      console.log(`Error en update user: ${error.errorMessage}`)
                      this.errorMessage = error.error;
                    }
                  )
                  this.userService.updatePlan(userId, response.body.planId).subscribe(//AÑADIR PLAN AL USUARIO LOGEADO
                    (response) => {
                      console.log('UserId: ', userId + 'PlanId: ', response.body.planId)
                      this.router.navigate(['plans']);
                    }, (error) => {
                     this.errorMessage = error.error;
                    }
                  )
                }, (error) => {
                  this.errorMessage = error.error;
                }
              ) 
        } else {
          console.log('No eres un soci')
        }
      },
      (error) => {
        console.log('Error auth', error.error);
      }
    );
  }
}
}