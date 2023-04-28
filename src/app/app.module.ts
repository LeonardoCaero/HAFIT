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
import { LoginComponent } from './login/login.component';
import { AuthModule } from '@auth0/auth0-angular';

import {MatIconModule} from '@angular/material/icon';
import { AuthButtonComponent } from './auth-button/auth-button.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthButtonLogoutComponent } from './auth-button-logout/auth-button-logout.component';
import { PlansComponent } from './plans/plans.component';
import { PlansFormComponent } from './plans-form/plans-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { EditorModule } from '@tinymce/tinymce-angular';
import { PlansViewComponent } from './plans-view/plans-view.component';
import { PlansAddFormComponent } from './plans-add-form/plans-add-form.component';
import { ExercicesComponent } from './exercices/exercices.component';
import { ExercicesEditFormComponent } from './exercices/exercices-edit-form/exercices-edit-form.component';
import { ExercicesAddFormComponent } from './exercices/exercices-add-form/exercices-add-form.component';
import { ExercicesViewComponent } from './exercices/exercices-view/exercices-view.component';
import { CloudinaryModule } from '@cloudinary/ng';
import {MatDialogModule} from '@angular/material/dialog';






@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeProductsComponent,
    FooterComponent,
    CarouselItemsComponent,
    LoginComponent,
    AuthButtonComponent,
    UserProfileComponent,
    AuthButtonLogoutComponent,
    PlansComponent,
    PlansFormComponent,
    PlansViewComponent,
    PlansAddFormComponent,
    ExercicesComponent,
    ExercicesEditFormComponent,
    ExercicesAddFormComponent,
    ExercicesViewComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,  
    AuthModule.forRoot({
      domain: 'dev-jwr2u354q8g4qn7i.us.auth0.com',
      clientId: 'KvYM7uivBTAza66zaPJPmtBUz0kpoUCw',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
    FormsModule,
    ReactiveFormsModule,
    AngularEditorModule,
    EditorModule,
    CloudinaryModule,
    MatDialogModule
  ],

  providers: [ProductDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
