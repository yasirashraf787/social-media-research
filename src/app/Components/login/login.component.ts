import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  textAreaAndSubmitButton_1 = false;
  textAreaAndSubmitButton_2 = false;
  
  public loginLogoutFBTxt: string = "Login To Facebook";
  public loginLogoutTwitterTxt:string="Login To Twitter";
  
  hideandShowbyfacebook()
  {
    this.textAreaAndSubmitButton_1 =!this.textAreaAndSubmitButton_1;

    if(this.textAreaAndSubmitButton_1)
    {
      this.loginLogoutFBTxt = "Logout From Facebook";
   
     
    }
    else
    {
      this.loginLogoutFBTxt = "Login To Facebook";

    }
  }
  
  hideandShowbytwitter()
  {  
    this.textAreaAndSubmitButton_2 =!this.textAreaAndSubmitButton_2;
    
    if(this.textAreaAndSubmitButton_2)
    {
        this.loginLogoutTwitterTxt = "Logout From Twitter";
    }
    else
    {
      this.loginLogoutTwitterTxt = "Login To Twitter";
    }
  }
  constructor() { }

  ngOnInit() {
  }

}
