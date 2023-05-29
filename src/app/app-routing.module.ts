import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartItemComponent } from './cart-item/cart-item.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductPageComponent } from './product-page/product-page.component';;
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ExercicesAddFormComponent } from './exercices/exercices-add-form/exercices-add-form.component';
import { ExercicesEditFormComponent } from './exercices/exercices-edit-form/exercices-edit-form.component';
import { ExercicesViewComponent } from './exercices/exercices-view/exercices-view.component';
import { ExercicesComponent } from './exercices/exercices.component';
// import { HomeProductsComponent } from './home-products/home-products.component';
import { LoginComponent } from './login/login.component';
import { PlansAddFormComponent } from './plans-add-form/plans-add-form.component';
import { PlansFormComponent } from './plans-form/plans-form.component';
import { PlansViewComponent } from './plans-view/plans-view.component';
import { PlansComponent } from './plans/plans.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SociSubscribeComponent } from './soci-subscribe/soci-subscribe.component';
import { DeletedPlanComponent } from './deleted-plan/deleted-plan.component';
import { UpdatedSuccessComponent } from './updated-success/updated-success.component';
import { DeletedExerciceComponent } from './deleted-exercice/deleted-exercice.component';
import { UpdatedSuccessExercicesComponent } from './updated-success-exercices/updated-success-exercices.component';
const routes: Routes = [
  // {path:'', component: HomeProductsComponent},
  {path:'login', component: LoginComponent},
  {path: 'plans', component: PlansComponent},
  {path: 'plans/edit/:planId',component: PlansFormComponent},
  {path: 'plans/add',component: PlansAddFormComponent},
  {path: 'plans/plan/:planId',component: PlansViewComponent},
  {path: 'plans/deleted',component: DeletedPlanComponent},
  {path: 'plans/updated',component: UpdatedSuccessComponent},
  {path: 'exercices', component: ExercicesComponent},
  {path: 'exercices/edit/:exerciceId',component: ExercicesEditFormComponent},
  {path: 'exercices/add',component: ExercicesAddFormComponent},
  {path: 'exercices/exercice/:exerciceId',component: ExercicesViewComponent},
  {path: 'exercices/deleted',component: DeletedExerciceComponent},
  {path: 'exercices/updated',component: UpdatedSuccessExercicesComponent},
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'subscribe-to-soci', component: SociSubscribeComponent },
  // {path:'', redirectTo:'home', pathMatch: 'full'},

  { path: 'product-list', component: ProductListComponent },
  { path: 'home', component: HomeComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'test-product', component: ProductPageComponent},
  { path: 'about-us', component: AboutUsComponent},
  { path: 'contact-us', component: ContactUsComponent},
  { path: ':type/:productName', component: ProductPageComponent},
  // { path: '**', component: NotFoundComponent },
  { path: 'cart', component: CartPageComponent},
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
