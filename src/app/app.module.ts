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
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { CarouselComponent } from './carousel/carousel.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AuthModule } from '@auth0/auth0-angular';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthServiceService } from './services/auth-service.service';
import { ProductPageComponent } from './product-page/product-page.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ProductListComponent,
    ProductCardComponent,
    TestShopComponent,
    CarouselComponent,
    FooterComponent,
    HomeComponent,
    UserProfileComponent,
    ProductPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    AuthModule.forRoot({
      domain: 'dev-jwr2u354q8g4qn7i.us.auth0.com',
      clientId: 'KvYM7uivBTAza66zaPJPmtBUz0kpoUCw',
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    }),
  ],
  providers: [ProductDataService, AuthServiceService, NavBarComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
