import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IProduct } from '../interfaces/iproduct';
import { ProductDataService } from '../services/product-data.service';
import { IPlan } from '../interfaces/iplan';
import { PlanDataService } from '../services/plan-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home-products',
  templateUrl: './home-products.component.html',
  styleUrls: ['./home-products.component.scss']
})
export class HomeProductsComponent implements OnInit{
  public data: any;
  public headers: HttpHeaders | undefined;
  products: IProduct[] = [];
  plans: IPlan[] = [];

  constructor(private productService: ProductDataService,
    private planService: PlanDataService) { }

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
      }
      
    })
    this.plans.forEach(plan => {
      if (plan.featuredImg === 'default') {
        plan.featuredImg = environment.defaultImage;
      }else if(plan.featuredImg == 'null'){//SI FEATUREDIMG ES NULL LO ELIMINA DE LA BBDD
        console.log(plan.planId)
        this.planService.deletePlan('planId',plan.planId).subscribe(
          (response)=>{},error =>{}
        )
      }
    });
  }
    
  }

  

