import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import { HttpClientModule } from  '@angular/common/http';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbTS2pmafe_Tr7OTnr_iELd0OZIJvLdv8",
  authDomain: "compound-interest-2468c.firebaseapp.com",
  projectId: "compound-interest-2468c",
  storageBucket: "compound-interest-2468c.appspot.com",
  messagingSenderId: "523631816036",
  appId: "1:523631816036:web:201e921807c9fe3e6c1e71"
};

// Initialize Firebase
  const app = initializeApp(firebaseConfig);

// Initialize Firestore
  export const db = getFirestore(app);
  
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}],
  bootstrap: [AppComponent],
})
export class AppModule {
}
