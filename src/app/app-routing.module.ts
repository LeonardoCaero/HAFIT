import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeProductsComponent } from './home-products/home-products.component';
import { LoginComponent } from './login/login.component';
import { PlansAddFormComponent } from './plans-add-form/plans-add-form.component';
import { PlansFormComponent } from './plans-form/plans-form.component';
import { PlansViewComponent } from './plans-view/plans-view.component';
import { PlansComponent } from './plans/plans.component';

const routes: Routes = [
  {path:'', component: HomeProductsComponent},
  {path:'login', component: LoginComponent},
  {path: 'plans', component: PlansComponent},
  {path: 'plans/edit/:planId',component: PlansFormComponent},
  {path: 'plans/add',component: PlansAddFormComponent},
  {path: 'plans/plan/:planId',component: PlansViewComponent},
  {path:'', redirectTo:'home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
