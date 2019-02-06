import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

// Import created components
import { ItemsModule } from './items/items.module';
import { MaterialModule } from './items/material.module';
import { AppRoutingModule } from './app-routing.module';

import { SnackBarStatusNetworkOfflineComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    SnackBarStatusNetworkOfflineComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ItemsModule,
    MaterialModule,
    AppRoutingModule,
    environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : []
  ],
  entryComponents: [
    SnackBarStatusNetworkOfflineComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
