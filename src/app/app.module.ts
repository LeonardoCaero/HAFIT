import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeProductsComponent } from './home-products/home-products.component';
import {MatCardModule} from '@angular/material/card'; 
import { ProductDataService } from './services/product-data.service';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';
import { CarouselItemsComponent } from './carousel-items/carousel-items.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeProductsComponent,
    FooterComponent,
    CarouselItemsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule
  ],
  providers: [ProductDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
