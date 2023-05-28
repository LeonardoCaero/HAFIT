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
import { NotFoundComponent } from './not-found/not-found.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EditorModule } from '@tinymce/tinymce-angular';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

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
    NotFoundComponent,
    CartItemComponent,
    CartPageComponent,
    AboutUsComponent,
    ContactUsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatGridListModule,
    MatSnackBarModule,
    MatIconModule,
    MatTooltipModule,
    AuthModule.forRoot({
      domain: 'dev-jwr2u354q8g4qn7i.us.auth0.com',
      clientId: 'KvYM7uivBTAza66zaPJPmtBUz0kpoUCw',
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    }),
    EditorModule,
    FormsModule,
    CKEditorModule,    
  ],
  providers: [ProductDataService, AuthServiceService, NavBarComponent],
  bootstrap: [AppComponent],
})
export class AppModule {
}
