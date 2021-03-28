function FBLogin(){
    console.log('fun');
    FB.login(function(response) {
        console.log(response);
        if (response.authResponse) {
            GetFBLoginStatus();
        }
    });
}

function GetFBLoginStatus()
{
    FB.getLoginStatus(function(response) {
        fbAccountResponse = response;
        console.log("login Response >>>>> " + JSON.stringify(fbAccountResponse));
    });
}