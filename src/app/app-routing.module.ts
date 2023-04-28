import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExercicesAddFormComponent } from './exercices/exercices-add-form/exercices-add-form.component';
import { ExercicesEditFormComponent } from './exercices/exercices-edit-form/exercices-edit-form.component';
import { ExercicesViewComponent } from './exercices/exercices-view/exercices-view.component';
import { ExercicesComponent } from './exercices/exercices.component';
import { HomeProductsComponent } from './home-products/home-products.component';
import { LoginComponent } from './login/login.component';
import { PlansAddFormComponent } from './plans-add-form/plans-add-form.component';
import { PlansFormComponent } from './plans-form/plans-form.component';
import { PlansViewComponent } from './plans-view/plans-view.component';
import { PlansComponent } from './plans/plans.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { TestShopComponent } from './test-shop/test-shop.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {path:'', component: HomeProductsComponent},
  {path:'login', component: LoginComponent},
  {path: 'plans', component: PlansComponent},
  {path: 'plans/edit/:planId',component: PlansFormComponent},
  {path: 'plans/add',component: PlansAddFormComponent},
  {path: 'plans/plan/:planId',component: PlansViewComponent},
  {path: 'exercices', component: ExercicesComponent},
  {path: 'exercices/edit/:exerciceId',component: ExercicesEditFormComponent},
  {path: 'exercices/add',component: ExercicesAddFormComponent},
  {path: 'exercices/exercice/:exerciceId',component: ExercicesViewComponent},
  { path:'', redirectTo:'home', pathMatch: 'full'},
  { path: 'product-list', component: ProductListComponent },
  { path: 'test', component: TestShopComponent },
  { path: 'home', component: HomeComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'test-product', component: ProductPageComponent},
  { path: ':type/:productName', component: ProductPageComponent},
  // { path: '**', component: NotFoundComponent },
  { path: 'tests', component: CartPageComponent},
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
