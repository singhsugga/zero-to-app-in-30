import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AgmCoreModule } from '@agm/core';
import { LoginComponent } from './login/login.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { SetLocationComponent } from './set-location/set-location.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SetLocationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, '0toappin30'),
    AgmCoreModule.forRoot({
      apiKey: environment.googleApiKey,
      apiVersion: '3.exp'
    })
  ],
  providers: [
    AngularFireAuth
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
