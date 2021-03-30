import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule,Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { SocialLoginModule, SocialAuthServiceConfig, FacebookLoginProvider } from 'angularx-social-login';

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
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('710790686284237')
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
