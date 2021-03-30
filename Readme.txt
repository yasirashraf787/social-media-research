1)Facebook credential 
   
   Email: aldevolabstesting@gmail.com
   Pass: aldevolabsTesting123
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
2)Follow this link to setup SSL for Node JS
  https://medium.com/@rubenvermeulen/running-angular-cli-over-https-with-a-trusted-certificate-4a0d5f92747a

  After generating server.crt and server.key files, copy them in the root folder and use the following command to run the app 

  ng serve --ssl --ssl-cert server.crt --ssl-key server.key
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
3)paste this on browser

  https://localhost:4200/ **




4) Facebook Integeration

    https://developers.facebook.com/docs/graph-api/overview/access-levels/

    https://developers.facebook.com/docs/development/create-an-app/app-dashboard/app-types/

    https://developers.facebook.com/docs/graph-api/reference/v10.0/insights
    

Standard Access
=====================
Business apps are automatically approved for Standard Access for all permissions and features available to the Business app type.

Permissions approved for Standard Access can be requested from any app user who has a role on the app or a role in a Business that has claimed the app. Similarly, 
features approved for Standard Access are only active for app users who have a role on the app or Business. 
This effectively restricts Business apps to only accessing data owned by app users who have a role on the app or Business.

This has several advantages:

All permissions can easily be tested by anyone with a role on the app or Business.
Apps that only need Standard Access for permissions or features do not have to undergo App Review.


    https://www.youtube.com/watch?v=MpLCBEdhg3Y

    What you need:
    appId = ClientId = 710790686284237
    appSecret = clientSecret = 162335292256921def59d5ed1df17943
    redirectURI = http://yasirashrafkhan.com/ 
    URLENCODE (redirectURI) = http%3A%2F%2Fyasirashrafkhan.com%2F

    Authorization End point (Browser):





<script>
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '{your-app-id}',
      cookie     : true,
      xfbml      : true,
      version    : '{api-version}'
    });
      
    FB.AppEvents.logPageView();   
      
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
</script>



FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
});


{
    status: 'connected',
    authResponse: {
        accessToken: '...',
        expiresIn:'...',
        signedRequest:'...',
        userID:'...'
    }
}

status specifies the login status of the person using the app. The status can be one of the following:
connected - the person is logged into Facebook, and has logged into your app.
not_authorized - the person is logged into Facebook, but has not logged into your app.
unknown - the person is not logged into Facebook, so you don't know if they've logged into your app or FB.logout() was called before and therefore, it cannot connect to Facebook.
authResponse is included if the status is connected and is made up of the following:
accessToken - contains an access token for the person using the app.
expiresIn - indicates the UNIX time when the token expires and needs to be renewed.
signedRequest - a signed parameter that contains information about the person using the app.
userID - the ID of the person using the app.
Once your app knows the login status of the person using it, it can do one of the following:
If the person is logged into Facebook and your app, redirect them to your app's logged in experience.
If the person isn't logged into your app, or isn't logged into Facebook, prompt them with the Login dialog with FB.login() or show them the Login Button.




function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}