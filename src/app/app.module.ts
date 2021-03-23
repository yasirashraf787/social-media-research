import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule,Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'user', component:LoginComponent },
  
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
