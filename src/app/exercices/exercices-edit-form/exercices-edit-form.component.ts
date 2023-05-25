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
  selector: 'app-exercices-edit-form',
  templateUrl: './exercices-edit-form.component.html',
  styleUrls: ['./exercices-edit-form.component.scss']
})
export class ExercicesEditFormComponent {
  constructor( private exerciceServices: ExerciceDataService,
    private router:Router,
    private route: ActivatedRoute,
    private formBuilder:FormBuilder,
    private authService: AuthServiceService,
    private userService:UserDataService,
    private elementRef :ElementRef,
    private uploadService: ImageUploadServiceService,
    ){
    this.myForm = this.formBuilder.group({//Inicializar formulario vacio para que no de error
      name: '',
      description: '',
      time: '',
      featuredImg: ''
    });
    
  }
  exercices :Iexercice [] = [];
  exercice: any = {};
  public Editor = ClassicEditor;
  editorInstance: any;

deleteExercice(): void {
  if (confirm('Are you sure?')) {
  const exerciceId = this.route.snapshot.paramMap.get('exerciceId');
  this.authService.checkUser().subscribe(
    response =>{
      const userId = response.userId
      this.userService.deleteExercice(userId,exerciceId).subscribe(
        response =>{
          this.exerciceServices.deleteExercice('exerciceId',exerciceId).subscribe(
            response =>{
              console.log('Eliminado exercice');
              
            },error=>{
              console.log(`Error eliminando el exercice ${error.error}`);
              
            }
          )
          console.log('eliminado correctamente');
          
        }, error =>{
          console.log(`Error eliminando ${error.error}`);
        }
      )
    },error=>{
      console.log(`error check user ${error.errorMessage}`);
      
    }
  )
  this.router.navigate(['exercices/deleted'])
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
        const exerciceId = this.route.snapshot.paramMap.get('exerciceId');
        this.exerciceServices.getExercice("exerciceId",exerciceId).subscribe(
          (data) => {
            this.exercice = data.body;  
            this.myForm = this.formBuilder.group({//Poner los datos del plan en el formulario
                name: [this.exercice.name,[Validators.required,Validators.maxLength(15),Validators.minLength(2)]],//[this.plan.name,Validators.required,Validators.maxLength(15),Validators.minLength(2)],
                description: ['',Validators.required],
                time:[this.exercice.time,[Validators.pattern('^[0-9]+$')]],
                featuredImg: ''
            });
            const exercice_description = this.exercice.description ? this.exercice.description : '';
            
            this.editorInstance.setData(exercice_description)
            console.log(this.exercice.featuredImg)
    
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
          if (response.userResponse.type != 'soci') {
            this.router.navigate(['subscribe-to-soci'])
          }
        },(error)=>{
          this.router.navigate(['subscribe-to-soci'])
        }
      )
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
    var name = this.myForm.get('name'); 
    var description = this.myForm.get('description');
    var time = this.myForm.get('time');
    const exerciceId = this.route.snapshot.paramMap.get('exerciceId');
    let featuredImg = this.fileName 
    if (name) {formData.append("name", name.value)} ;
    if (description) {formData.append("description", description.value)};
    if (time) {formData.append("time", time.value)};

    if (featuredImg!='default') {
      this.uploadService.uploadImage(this.formdata).subscribe(
        response=>{
          this.exerciceServices.updateExercice(exerciceId,formData,this.editorInstance.getData(),response.secure_url).subscribe(
            response =>{
              this.router.navigate(['exercices/updated'])
            },error=>{
              this.errorMessage = error.error
            }
          )
        },
        error=>{
          console.log('error subieno l aimagen');
          this.errorMessage = error.error
        }
      )
    }

    
    this.exerciceServices.updateExercice(exerciceId,formData,this.editorInstance.getData(),this.exercice.featuredImg).subscribe({
      next: (data) => {
        this.router.navigate(['exercices/updated']);
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