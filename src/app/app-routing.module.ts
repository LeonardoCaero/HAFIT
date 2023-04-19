import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { TestShopComponent } from './test-shop/test-shop.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  { path: 'product-list', component: ProductListComponent },
  { path: 'test', component: TestShopComponent },
  { path: 'home', component: HomeComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'test-product', component: ProductPageComponent},
  { path: ':type/:productName', component: ProductPageComponent},
  // { path: '**', component: NotFoundComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
