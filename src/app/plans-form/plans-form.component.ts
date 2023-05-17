import { Component,  ElementRef,  EventEmitter,  OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IPlan } from '../interfaces/iplan';
import { PlanDataService } from '../services/plan-data.service';  
import { AuthServiceService } from '../services/auth-service.service';
import { UserDataService } from '../services/user-data.service';
import { environment } from 'src/environments/environment';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ImageUploadServiceService } from '../services/image-upload-service.service';



@Component({
  selector: 'app-plans-form',
  templateUrl: './plans-form.component.html',
  styleUrls: ['./plans-form.component.scss']
})

export class PlansFormComponent implements OnInit {

  constructor( private planServices: PlanDataService,
    private router:Router,
    private route: ActivatedRoute,
    private formBuilder:FormBuilder, 
    private authService: AuthServiceService,
    private userService:UserDataService,
    private elementRef :ElementRef,
    private uploadService: ImageUploadServiceService,
    ){
    this.myForm = this.formBuilder.group({//Inicializar formulario vacio para que no de error
      name:'',
      description:'',
      featuredImg:''
    });
  }
  plans :IPlan [] = [];
  plan: any = {};
  public Editor = ClassicEditor;


deletePlan(): void {
  if (confirm('Are you sure?')) {
  const planId = this.route.snapshot.paramMap.get('planId');
      this.authService.checkUser().subscribe(//CHECK USER
        (response)=>{
          const userId = response.userId
          this.userService.deletePlan(userId,planId).subscribe(//ELIMINAR PLAN DEL USER
            (response) => {
              this.planServices.deletePlan('planId',planId).subscribe(//ELIMINAR PLAN
                (reponse)=>{
                  
                  console.log('Eliminado correctamente el plan')
                },(error)=>{
                  console.log(`Error eliminado el plan.plan ${error.errorMessage}`)
                }
              )
              console.log('Eliminado correctamente')
            }
            , (error) =>{console.log(`Error eliminado ${error.errorMessage}`)}
          )
        },(error) =>{console.log(`Error check user ${error.errorMessage}`)}
      )
      this.router.navigate(['plans/deleted'])
      console.log(`Eliminado correctamente`)
  }
}
 
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
    const planId = this.route.snapshot.paramMap.get('planId');
    this.planServices.getPlan("planId",planId).subscribe(
      (data) => {
        this.plan = data.body;  
        this.myForm = this.formBuilder.group({//Poner los datos del plan en el formulario
          name: [this.plan.name],
          description: [this.plan.description], 
          featuredImg:''
        });
        console.log(this.plan.featuredImg)
      },
      (error) => {
        this.errorMessage = error.message;
      }
    );
  }


  myForm:FormGroup;
  errorMessage:String = '';
  fileName:any;
  formdata: FormData = new FormData();

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file;
      this.formdata.append("file", file); 
      this.formdata.append('upload_preset','plan-preset')  
      this.formdata.append('cloud_name',environment.CLOUD_NAME)

    }
  }

  onSubmit(plan:any):void{
    let formData = new FormData();
    var name = this.myForm.get('name'); //GET VALUES
    var description = this.myForm.get('description');
    const planId = this.route.snapshot.paramMap.get('planId');

      var featuredImage =this.fileName;
    
   console.log('Featured Image: ',featuredImage?.value)
    // description = encodeURI(description?.value)
    if (name) {formData.append("name", name.value)} ;
    if (description) {formData.append("description", description.value)};
    if (featuredImage) {  
      this.uploadService.uploadImage(this.formdata).subscribe(
        response=>{
          console.log(response);  
            this.planServices.updatePlans(planId,name?.value,formData,response.secure_url,description).subscribe({//IF IT'S ALL OK UPDATE PLAN
              next: (data) => {
                this.router.navigate(['plans']);
              },
                error: (error) => {
                    console.log(
                      `Backend returned sd code ${error.status}, body was: `, error.error);
                      this.errorMessage = error.error;
                }
            })
             }, error =>{
              console.log('Error subiendo la imagen a cloudinary: ',error.error)
            });
        }else if(!featuredImage){
//IF THERE ISN'T FEATURED IMAGE UPLOAD THE PLAN
      this.planServices.getPlan('planId',planId).subscribe(
        response =>{
          const urlImg =  response.body.featuredImg
          console.log(response.body.featuredImg)
          this.planServices.updatePlans(planId,name?.value,description?.value,urlImg,formData).subscribe({
        next: (data) => {
          this.router.navigate(['plans']);
        },
          error: (error) => {
     
              this.errorMessage = error.error;

              console.log(
                `Backend sdasds returned code ${error.status}, body was: `, error.error);             
  
          }
      });
        }
      )
      
    
  

}
  }

// onFileSelect(event:any) {
//   if (event.target.files.length > 0) {
//     var file = event.target.files[0];
//     console.log(file)
//     var featuredImg = this.myForm.get('featuredImg');
//     if(featuredImg){
//       featuredImg.setValue(file);
//       console.log(featuredImg)
//     }
//   }
// }
}