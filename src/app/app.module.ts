import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDataService } from './services/product-data.service';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductCardComponent } from './product-card/product-card.component';
import { TestShopComponent } from './test-shop/test-shop.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import { CarouselComponent } from './carousel/carousel.component'; 

@NgModule({
  declarations: [AppComponent, NavBarComponent, ProductListComponent, ProductCardComponent, TestShopComponent, CarouselComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,  
    MatGridListModule,
    MatIconModule
  ],
  providers: [ProductDataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
