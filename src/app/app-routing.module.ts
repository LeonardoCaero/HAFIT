import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { TestShopComponent } from './test-shop/test-shop.component';

const routes: Routes = [
  { path: 'product-list', component: ProductListComponent },
  {path: 'test', component: TestShopComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
