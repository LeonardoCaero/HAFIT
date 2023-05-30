import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { HomeProductsComponent } from './home-products/home-products.component';
// import {MatCardModule} from '@angular/material/card'; 
// import { ProductDataService } from './services/product-data.service';
// import { HttpClientModule } from '@angular/common/http';
import { CarouselItemsComponent } from './carousel-items/carousel-items.component';
import { LoginComponent } from './login/login.component';
// import { AuthModule } from '@auth0/auth0-angular';
// import {MatIconModule} from '@angular/material/icon';
import { AuthButtonComponent } from './auth-button/auth-button.component';
// import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthButtonLogoutComponent } from './auth-button-logout/auth-button-logout.component';
import { PlansComponent } from './plans/plans.component';
import { PlansFormComponent } from './plans-form/plans-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
// import { EditorModule } from '@tinymce/tinymce-angular';
import { PlansViewComponent } from './plans-view/plans-view.component';
import { PlansAddFormComponent } from './plans-add-form/plans-add-form.component';
import { ExercicesComponent } from './exercices/exercices.component';
import { ExercicesEditFormComponent } from './exercices/exercices-edit-form/exercices-edit-form.component';
import { ExercicesAddFormComponent } from './exercices/exercices-add-form/exercices-add-form.component';
import { ExercicesViewComponent } from './exercices/exercices-view/exercices-view.component';
import {MatDialogModule} from '@angular/material/dialog';
import { SociSubscribeComponent } from './soci-subscribe/soci-subscribe.component';
import { DeletedPlanComponent } from './deleted-plan/deleted-plan.component';
// import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
// import { AuthServiceService } from './services/auth-service.service';
// import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular-5.x';
import * as cloudinary from 'cloudinary-core';
import { UpdatedSuccessComponent } from './updated-success/updated-success.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { DeletedExerciceComponent } from './deleted-exercice/deleted-exercice.component';
import { UpdatedSuccessExercicesComponent } from './updated-success-exercices/updated-success-exercices.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDataService } from './services/product-data.service';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductCardComponent } from './product-card/product-card.component';
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
// import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    // HomeProductsComponent,
    FooterComponent,
    CarouselItemsComponent,
    LoginComponent,
    AuthButtonComponent,
    AuthButtonLogoutComponent,
    PlansComponent,
    PlansFormComponent,
    PlansViewComponent,
    PlansAddFormComponent,
    ExercicesComponent,
    ExercicesEditFormComponent,
    ExercicesAddFormComponent,
    ExercicesViewComponent,
    SociSubscribeComponent,
    DeletedPlanComponent,
    ConfirmationDialogComponent,
    UpdatedSuccessComponent,
    DeletedExerciceComponent,
    UpdatedSuccessExercicesComponent,
    ProductListComponent,
    ProductCardComponent,
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
    MatIconModule,  
    // AuthModule.forRoot({
    //   domain: 'dev-jwr2u354q8g4qn7i.us.auth0.com',
    //   clientId: 'KvYM7uivBTAza66zaPJPmtBUz0kpoUCw',
    //   authorizationParams: {
    //     redirect_uri: window.location.origin
    //   }
    // }),
    FormsModule,
    ReactiveFormsModule,
    AngularEditorModule,
    // EditorModule,
    MatDialogModule,
    MatSnackBarModule,
    // CKEditorModule,
    CloudinaryModule,
    NgxPayPalModule,
    // HttpClientModule,
    // BrowserAnimationsModule,
    // MatCardModule,
    MatGridListModule,
    MatSnackBarModule,
    // MatIconModule,
    MatTooltipModule,
    AuthModule.forRoot({
      domain: environment.auth_domain,
      clientId: environment.auth_clientId,
      authorizationParams: {
        // redirect_uri: window.location.origin,
       redirect_uri: "https://leonardocaero.github.io/HAFIT/",
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
