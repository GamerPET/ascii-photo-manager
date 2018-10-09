import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomMaterialModule} from './material.module';

import { AuthService } from './services/auth.service';
import { PhotosService } from './services/photos.service';
import { CommentsService } from './services/comments.service';

import { LoginComponent } from './login/login.component';
import { GalleryComponent } from './gallery/gallery.component';
import { AddImageComponent } from './add-image/add-image.component';
import { ImageDetailComponent } from './image-detail/image-detail.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ImageCommentsComponent } from './image-comments/image-comments.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GalleryComponent,
    AddImageComponent,
    ImageDetailComponent,
    NavbarComponent,
    ImageCommentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, AngularFireDatabase, PhotosService, CommentsService],
  bootstrap: [AppComponent]
})
export class AppModule {}
