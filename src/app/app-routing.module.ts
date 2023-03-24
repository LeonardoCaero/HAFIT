import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeProductsComponent } from './home-products/home-products.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:'home', component: HomeProductsComponent},
  {path:'login', component: LoginComponent},
    {path:'', redirectTo:'home', pathMatch: 'full'},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
