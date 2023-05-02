import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CloudinaryImage } from '@cloudinary/url-gen';
import { Cloudinary } from '@cloudinary/angular-5.x';

import { IPlan } from '../interfaces/iplan';
import { PlanDataService } from '../services/plan-data.service';
import { AuthServiceService } from '../services/auth-service.service';
import { UserDataService } from '../services/user-data.service';





@Component({
  selector: 'app-plans-add-form',
  templateUrl: './plans-add-form.component.html',
  styleUrls: ['./plans-add-form.component.scss']
})
export class PlansAddFormComponent {
  myForm: FormGroup;
  errorMessage: String = '';
  featuredImg!: CloudinaryImage;
  myWidget: any;
  // public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'photo' });
  constructor(private planServices: PlanDataService,
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

  onSubmit(plan: any): void {

    let formData = new FormData();
    var name = this.myForm.get('name')?.value; //Obtener valores del formulario
    var description = this.myForm.get('description')?.value;
    var featuredImage = this.myForm.get('featuredImage');


    // if (name) { formData.append("name", name.value) };// Si name tiene valor añadirlo al formdata
    // if (description) { formData.append("description", description.value) };
    if (featuredImage) {
      this.planServices.uploadImage(featuredImage.value).subscribe({
        next: (data) => {
          this.plan.featuredImg = data
          formData.append("featuredImg", this.plan.featuredImg)
          this.authService.checkUser().subscribe(
            (response) => {
              const userId = response.userId
              this.planServices.addPlan(name, description,this.featuredImg).subscribe(
                (response) => {
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
    }

    this.authService.checkUser().subscribe(
      (response) => {
        const userId = response.userId;
        console.log(userId)
        if (response.type === "soci") {
        this.planServices.addPlan(name, description,'default').subscribe(
          (response) => {
            this.userService.updatePlan(userId, response.body.planId).subscribe(
              (response) => {
                console.log('UserId: ',userId + 'PlanId: ',response.body.planId)
                this.router.navigate(['plans']);
              }, (error) => {
                console.log('Error updatePlan service')
              }
            )
          }, (error) => {
            console.error('Error addplan no img:', error.error + ' '+name+' '+description);
          }
        )
      }else{
        console.log('No eres un soci')
      }
    },
      (error) => {
        console.log('Error auth',error.error);
      }
    );
  }
}
