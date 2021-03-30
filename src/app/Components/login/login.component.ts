import { Component, OnInit } from '@angular/core';
import { SocialAuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
import { FBServicesService } from '../../Services/fbservices.service';
import { AuthenticateService } from '../../Services/authenticate.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loggedIn: boolean = false;
  public user: SocialUser;
  public userId: string;
  public pageAccessToken: string;
  public pageId: string;

  public fbForm: FormGroup;

  constructor(private socialAuthService: SocialAuthService, private FBServices: FBServicesService, private auth: AuthenticateService) { }

  ngOnInit() {

    this.fbForm = new FormGroup({
      message: new FormControl('')
    });
  }

  public SignInFB(): void {

    if(!this.loggedIn)
    {
      const fbLoginOptions = {
        scope: 'public_profile,email,pages_manage_posts,read_insights,pages_read_engagement'
      };
  
      this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID, fbLoginOptions).then((user) =>{
        this.user = user;
        this.loggedIn = true;
        console.log("User Response: ", user);
        this.userId = user.id;
        console.log("User id: " + this.userId);
        
        this.auth.SaveToken(user.authToken);
        this.FBServices.header = this.auth.Header();
        // console.log(this.auth.GetToken());
        
        this.FBServices.GetPages(this.userId).subscribe(response => {
          console.log(response);
          this.pageAccessToken = response.data[0].access_token;
          this.pageId = response.data[0].id;

          console.log("Page access token: ", this.pageAccessToken);
          console.log("Page id: ", this.pageId);
        })

      }).catch(err => {
        console.log(err);
      });
    }
  }

  public SignOutFB(): void {
    this.socialAuthService.signOut(true).then((user) => {
      console.log("User: ", user);
      this.loggedIn = false;
      this.auth.DeleteToken();
    }).catch(err => {
      console.log("Error: " + err);
    })
  }

  public SubmitPost(): void {
    console.log(this.fbForm.value);
    // console.log(document.getElementById('fbmessage').innerText);
    // this.FBServices.PublishContentToPage(this.fbForm.value).subscribe(data => {

    // });
  }

}
