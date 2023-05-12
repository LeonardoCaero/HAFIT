import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';



import { IPlan } from '../interfaces/iplan';
import { PlanDataService } from '../services/plan-data.service';
import { AuthServiceService } from '../services/auth-service.service';
import { UserDataService } from '../services/user-data.service';

import { environment } from 'src/environments/environment';
// import { Cloudinary } from '@cloudinary/url-gen';



@Component({
  selector: 'app-plans-add-form',
  templateUrl: './plans-add-form.component.html',
  styleUrls: ['./plans-add-form.component.scss']
})
export class PlansAddFormComponent {
  myForm: FormGroup;
  errorMessage: String = '';
  fileName :any;
  myWidget:any;

  // public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'photo' });
  constructor(
    private planServices: PlanDataService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthServiceService,
    private userService: UserDataService) {
    this.myForm = new FormGroup({

    });

  }

  plans: IPlan[] = [];
  plan: any = {};

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
      description: '',
      featuredImg: ''
    });
  }
  // onFileSelected(event: any) {
  //   const file: File = event.target.files[0];
  //   if (file) {
  //     this.fileName = file;
  //     this.formdata.append("featuredImg", file);
     

  //   }
  // }
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
  

  
formdata: FormData = new FormData();
/*
*-------------------------------------------------ARREGLAR CORS ---------------------------------------------------------
*/
  onSubmit(plan: any){

    let formData = new FormData();
    var name = this.myForm.get('name')?.value; //Obtener valores del formulario
    var description = this.myForm.get('description')?.value;
    // var featuredImage = this.myForm.get('featuredImg');
    var featuredImage = this.base64Img;
    // console.log(featuredImage)
    console.log(this.formdata.getAll('featuredImg'));
    // if (name) { formData.append("name", name.value) };// Si name tiene valor añadirlo al formdata
    // if (description) { formData.append("description", description.value) };
    if (featuredImage) {
      this.planServices.uploadImage(this.base64Img).subscribe({
        next: (responseImg) => {
          console.log('UPLOADING IMAGES....')
          this.plan.featuredImg = this.fileName
          console.log(this.fileName)
          console.log(responseImg)
          this.authService.checkUser().subscribe(
            (response) => {
              const userId = response.userId;//ID AUTOINCREMENT
              const user_id = response._id//ID DEFAULT DE MONGO
             
              this.planServices.addPlan(name, description, this.fileName).subscribe(
                (response) => {
                  console.log('ok')
                  this.planServices.updateUser(user_id, response.body.planId).subscribe(
                    (response) => {
                      console.log('AÑADIDO')

                    }, (error) => {
                      console.log(`Error en update user: ${error.error}`)
                    }
                  )
                  this.userService.updatePlan(userId, response.body.planId).subscribe(
                    (reponse) => {
                      this.router.navigate(['plans']);
                    },
                    (error) => {
                      console.log('Update plans error: ', error.error)
                    }
                  )
                },
                (error) => {
                  console.log('Add plan error: ', error.error)
                }
              )
            }, (error) => {
              console.log('Error auth:', error.error)
            }

          )
        }, error: (error) => {


        }
      })
    }else if (!featuredImage){
    this.authService.checkUser().subscribe(
      (response) => {
        const userId = response.userId;//ID AUTOINCREMENT
        const user_id = response._id//ID DEFAULT DE MONGO
        console.log(userId)
        if (response.type === "soci") {
              this.planServices.addPlan(name, description, 'default').subscribe(//AFEGIR NOU PLAN
                (response) => {
                  this.planServices.updateUser(user_id, response.body.planId).subscribe(//AÑADIR _ID DEL USER AL PLAN
                    (response) => {
                      console.log('NO IMAGEN UPDATED')
                    }, (error) => {
                      console.log(`Error en update user: ${error.errorMessage}`)
                    }
                  )
                  this.userService.updatePlan(userId, response.body.planId).subscribe(//AÑADIR PLAN AL USUARIO LOGEADO
                    (response) => {
                      console.log('UserId: ', userId + 'PlanId: ', response.body.planId)
                      this.router.navigate(['plans']);
                    }, (error) => {
                      console.log(`Error updatePlan service: ${error.errorMessage}`)
                    }
                  )
                }, (error) => {
                  console.error('Error addplan no img:', error.errorMessage + ' ' + name + ' ' + description );
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
