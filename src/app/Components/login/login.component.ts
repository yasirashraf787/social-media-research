import { Component, OnInit, ViewChild } from '@angular/core';
import { SocialAuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
import { FBServicesService } from '../../Services/fbservices.service';
import { AuthenticateService } from '../../Services/authenticate.service';
import { FormControl, FormGroup } from '@angular/forms';
import { templateJitUrl, ThrowStmt } from '@angular/compiler';
import { TwitterService } from 'src/app/Services/twitter.service';
import { LinkedinService } from 'src/app/Services/linkedin.service';
import { ActivatedRoute } from '@angular/router';

declare var $: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public fbLoggedIn: boolean = false;
  public twitterLoggedIn: boolean = false;
  public linkedinLoggedIn: boolean = false;

  public fbUser: SocialUser;
  public fbUserId: string;
  public pageAccessToken: string;
  public pageId: string;
  public isGetImpressionClicked: boolean = false;
  public isModalOpen: boolean = false;

  public impressionsCount: number;
  public fanCount: number;

  public fbForm: FormGroup;
  public twitterForm: FormGroup;
  public linkedinForm: FormGroup;

  public verifyCode: string = '';
  public OAuthToken: string = '';
  public OAuthTokenSecret: string = '';

  public consumerOAuthToken: string = '';
  public consumerOAuthTokenSecret: string = '';

  public linkedInUserId: string = '';
  public linkedInUserToken: string = '';

  constructor(private socialAuthService: SocialAuthService, private FBServices: FBServicesService, 
    private auth: AuthenticateService, private TwitterServices: TwitterService, private LinkedInServices: LinkedinService,
    private activateRoute: ActivatedRoute) 
    {
      this.activateRoute.queryParams.subscribe(params => {
        const authorized = params['authorized'];
        this.linkedInUserToken = params['token'];
        console.log('authorized: ' + authorized);
        console.log('token: ' + this.linkedInUserToken);

        if(authorized != undefined){
          this.LinkedInServices.GetUser(authorized, this.linkedInUserToken).subscribe(response => {
            if(authorized == 'true'){
              console.log(authorized, response);
              this.linkedInUserId = response.userId;
              this.linkedinLoggedIn = true;
            }
          });
        }

      });
    }

  ngOnInit() {

    this.fbForm = new FormGroup({
      message: new FormControl('')
    });

    this.twitterForm = new FormGroup({
      message: new FormControl('')
    });

    this.linkedinForm = new FormGroup({
      message: new FormControl('')
    });
  }

  public SignInFB(): void {

    if(!this.fbLoggedIn)
    {
      const fbLoginOptions = {
        scope: 'public_profile,email,pages_manage_posts,read_insights,pages_read_engagement'
      };
  
      this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID, fbLoginOptions).then((user) =>{
        this.fbUser = user;
        this.fbLoggedIn = true;
        console.log("User Response: ", user);
        this.fbUserId = user.id;
        console.log("User id: " + this.fbUserId);
        
        this.auth.SaveToken(user.authToken);
        this.FBServices.header = this.auth.Header();
        // console.log(this.auth.GetToken());
        
        this.FBServices.GetPages(this.fbUserId).subscribe(response => {
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
      this.fbLoggedIn = false;
      this.auth.DeleteToken();
      this.isGetImpressionClicked = false;
      this.resetFBForm();

    }).catch(err => {
      console.log("Error: " + err);
    })
  }

  public SubmitPost(): void {
    console.log(this.fbForm.value.message);
    if(this.fbForm.value.message == '')
    {
      alert('Your Content is empty, please write something...');
      return;
    }

    var postData = {
      message: this.fbForm.value.message,
      access_token: this.pageAccessToken
    }
    this.FBServices.PublishContentToPage(this.pageId, postData).subscribe(response => {
      console.log("Response: ", response);
      alert('Your content posted successfuly');
      this.resetFBForm();
    });
  }

  public GetPageImpressions(): void {
    this.FBServices.GetPageImpressions(this.pageId, this.pageAccessToken).subscribe((response) => {
      console.log(response['data']);
      // console.log('Impressions', response.data[0].values[0].value);
      this.isGetImpressionClicked = true;
      this.impressionsCount = response['data'][0].values[0].value;
    });

    this.GetPageLikes();
  }

  public GetPageLikes(): void{
    this.FBServices.GetPageLikes(this.pageId).subscribe(response => {
      console.log('Page Likes: ', response['fan_count']);
      this.fanCount = response['fan_count'];
    })
  }

  public resetFBForm(): void {
    this.fbForm = new FormGroup({
      message: new FormControl('')
    });
  }

  public resetTwitterForm(): void {
    this.twitterForm = new FormGroup({
      message: new FormControl('')
    });
  }

  public resetLinkedInForm(): void {
    this.linkedinForm = new FormGroup({
      message: new FormControl('')
    });
  }

  public SignInTwitter(): void {

    if(!this.twitterLoggedIn)
    {
      $('#varifierPopup').modal('show');
      this.verifyCode = '';
      this.TwitterServices.GetAuthorize().subscribe(response => {
        console.log(response);
        this.OAuthToken = response.oauthRequestToken;
        this.OAuthTokenSecret = response.oauthRequestTokenSecret;
        window.open(response.redirectUrl);
      });
    }
  }

  public VerifyCode(): void {
    console.log(this.verifyCode);
    console.log(this.OAuthToken);

    this.TwitterServices.GetAccessToken(this.OAuthToken, this.OAuthTokenSecret, this.verifyCode).subscribe(response => {
      console.log(response);
      this.consumerOAuthToken = response.access_token;
      this.consumerOAuthTokenSecret = response.access_token_secret;

      this.twitterLoggedIn = true;

    });
  }

  public SubmitTweet(): void {
    console.log(this.twitterForm.value.message);
    if(this.twitterForm.value.message == '')
    {
      alert('Your Content is empty, please write something...');
      return;
    }

    var tweet = {
      message: this.twitterForm.value.message
    }
    this.TwitterServices.PostTweet(this.consumerOAuthToken, this.consumerOAuthTokenSecret, tweet).subscribe(response => {
      console.log(response);
      alert('Your content posted successfuly');
      this.resetTwitterForm();
    });
  }

  public LogoutTwitter(): void {
    this.twitterLoggedIn = false;
    this.resetTwitterForm();
  }

  public SignInLinkedIn(): void {
    console.log('Login LinkedIn');
    this.LinkedInServices.GetAuth().subscribe(response => {
      // console.log(response.redirectURL);
      window.open(response.redirectURL);
    })
    // window.open('https://www.linkedin.com/oauth/v2/authorization?client_id=7772x28uth7umh&redirect_uri=http://localhost:3000/linkedin&response_type=code&scope=r_liteprofile%20r_emailaddress%20w_member_social');
  }

  public SubmitLinkedInPost(): void {
    if(this.linkedinForm.value.message == ''){
      alert('Your content is empty, please write something...');
      return;
    }

    var data = {
      title: 'Testing Post',
      text: this.linkedinForm.value.message,
      url: 'https://localhost:4200/letthemknow',
      thumb: 'https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      id: this.linkedInUserId
    }

    this.LinkedInServices.PublishContent(data, this.linkedInUserToken).subscribe(response => {
      console.log(response);
      if(response.success){
        alert('Your content posted Successfully.');
      }
    });
  }

  public LogoutLinkedin(): void {
    this.linkedinLoggedIn = false;
    this.resetLinkedInForm();
  }
}