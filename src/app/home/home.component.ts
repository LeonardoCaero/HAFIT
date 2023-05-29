import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductDataService } from '../services/product-data.service';
import { PlanDataService } from '../services/plan-data.service';
import { AuthServiceService } from '../services/auth-service.service';
import { ExerciceDataService } from '../services/exercice-data.service';
import { IProduct } from '../interfaces/iproduct';
import { IPlan } from '../interfaces/iplan';
import { Iexercice } from '../interfaces/iexercice';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  public data: any;
  public headers: HttpHeaders | undefined;
  products: IProduct[] = [];
  plans: IPlan[] = [];
  exercices: Iexercice[] = []

  constructor(private productService: ProductDataService,
    private planService: PlanDataService,
    private authService: AuthServiceService,
    private exerciceService: ExerciceDataService
    ) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(resp => {
      if (resp.body != null) {
        console.log(resp.body);
        this.products = resp.body;
      }
    });
    
        this.planService.getPlans().subscribe(resp=>{
          if (resp.body !=null) {
            this.plans = resp.body
            this.plans.sort((a, b) => +b.view - (+a.view));
            this.plans.forEach(plan => {
              if (plan.featuredImg == 'default') {
                plan.featuredImg = environment.defaultImage;
              }else if(plan.featuredImg == 'null'){//SI FEATUREDIMG ES NULL LO ELIMINA DE LA BBDD
                console.log(plan.planId)
                this.planService.deletePlan('planId',plan.planId).subscribe(
                  (response)=>{},error =>{}
                )
              }
            });
          }
          
        })
     this.exerciceService.getExercices().subscribe(resp=>{
      if (resp.body != null) {
        this.exercices = resp.body
        this.exercices.sort((a,b) => +b.view -(+a.view))
        this.exercices.forEach(exercice=>{
          if (exercice.featuredImg == 'default') {
            exercice.featuredImg = environment.defaultImage
          }else if (exercice.featuredImg == 'null') {
            this.exerciceService.deleteExercice('exerciceId',exercice.exerciceId)
          }
        })
      }
     })
   
  
  }
}
