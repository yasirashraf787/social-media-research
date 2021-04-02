import { Component, OnInit, ViewChild } from '@angular/core';
import { SocialAuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
import { FBServicesService } from '../../Services/fbservices.service';
import { AuthenticateService } from '../../Services/authenticate.service';
import { FormControl, FormGroup } from '@angular/forms';
import { templateJitUrl, ThrowStmt } from '@angular/compiler';
import { TwitterService } from 'src/app/Services/twitter.service';

declare var $: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public fbLoggedIn: boolean = false;
  public twitterLoggedIn: boolean = false;
  public user: SocialUser;
  public userId: string;
  public pageAccessToken: string;
  public pageId: string;
  public isGetImpressionClicked: boolean = false;
  public isModalOpen: boolean = false;

  public impressionsCount: number;
  public fanCount: number;

  public fbForm: FormGroup;
  public twitterForm: FormGroup;

  public verifyCode: string = '';
  public OAuthToken: string = '';
  public OAuthTokenSecret: string = '';

  public consumerOAuthToken: string = '';
  public consumerOAuthTokenSecret: string = '';

  constructor(private socialAuthService: SocialAuthService, private FBServices: FBServicesService, 
    private auth: AuthenticateService, private TwitterServices: TwitterService) { }

  ngOnInit() {

    this.fbForm = new FormGroup({
      message: new FormControl('')
    });

    this.twitterForm = new FormGroup({
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
        this.user = user;
        this.fbLoggedIn = true;
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

}
