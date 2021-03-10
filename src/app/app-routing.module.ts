import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{TestcomponentComponent} from './Components/testcomponent/testcomponent.component'

const routes: Routes = [

  { path: 'login', component: TestcomponentComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
