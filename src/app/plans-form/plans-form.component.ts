import { Component,  ElementRef,  EventEmitter,  OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  editorInstance: any;

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
    ClassicEditor.create(this.elementRef.nativeElement.querySelector('#editor'), {
      cloudServices: {
        tokenUrl: 'https://97727.cke-cs.com/token/dev/U1ePTKYik4hYbvLo1lTt33V88qVxgg9iXIGp?limit=10',
        uploadUrl: 'https://97727.cke-cs.com/easyimage/upload/'
      },
      
    })
      .then(editor => {
        this.editorInstance = editor;
        const planId = this.route.snapshot.paramMap.get('planId');
        this.planServices.getPlan("planId",planId).subscribe(
          (data) => {
            this.plan = data.body;  
            this.myForm = this.formBuilder.group({//Poner los datos del plan en el formulario
                name: [this.plan.name,[Validators.required,Validators.maxLength(15),Validators.minLength(2)]],//[this.plan.name,Validators.required,Validators.maxLength(15),Validators.minLength(2)],
                description: ['',Validators.required],
                featuredImg: ''
            });
            const plan_description = this.plan.description ? this.plan.description : '';
            
            this.editorInstance.setData(plan_description)
            console.log(this.plan.featuredImg)
    
          },
          (error) => {
            this.errorMessage = error.message;
          }
        );
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
   
  }
  description:string = ''
  loading: boolean  = false
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
      this.loading = true
    }
  }

  onSubmit(plan:any):void{
    let formData = new FormData();
    var name = this.myForm.get('name'); //GET VALUES
    var description = this.myForm.get('description');
    const planId = this.route.snapshot.paramMap.get('planId');
    var featuredImage =this.fileName;
    console.log(featuredImage);
    
    if (name) {formData.append("name", name.value)} ;
    if (description) {formData.append("description", description.value)};
    if (featuredImage !='default') {  
      this.uploadService.uploadImage(this.formdata).subscribe(
        response=>{
          console.log(response);  
            this.planServices.updatePlans(planId,name?.value, this.editorInstance.getData(),response.secure_url,formData).subscribe({//IF IT'S ALL OK UPDATE PLAN
              next: (data) => {
                this.router.navigate(['plans/updated']);
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
        }
//IF THERE ISN'T FEATURED IMAGE UPLOAD THE PLAN
      this.planServices.updatePlans(planId,name?.value, this.editorInstance.getData(),this.plan.featuredImg,formData).subscribe({
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
}