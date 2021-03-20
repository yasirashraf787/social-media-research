function FBLogin(){
    console.log('fun');
    FB.login(function(response) {
        console.log(response);
        if (response.authResponse) {
            GetFBLoginStatus();
        }
        //  console.log('Welcome!  Fetching your information.... ');
        //  FB.api('/me', function(response) {
        //    console.log('Good to see you, ' + response.name + '.');
        //  });
        // } else {
        //  console.log('User cancelled login or did not fully authorize.');
        // }
    });
}

function GetFBLoginStatus()
{
    FB.getLoginStatus(function(response) {
        console.log(response.authResponse);
        
        FB.api(
            "/"+response.authResponse.userID+"/accounts?",
            function (response) {
              if (response && !response.error) {
                /* handle the result */                
                var page_id = response['data'][1].id;
                var page_access_token = response['data'][1].access_token;
                // console.log("Accounts: " + page_access_token);

                FB.api(
                    "/"+page_id+"/feed",
                    "POST",
                    {
                        "message": "Testing from Javascript demo to yasir bhai after login....",
                        "access_token": page_access_token
                    },
                    function (response) {
                        console.log(response);
                        if (response && !response.error) {
                        /* handle the result */
                        console.log(response);
                        }
                    }
                );
              }
            }
        );
    });

    // return null;
}

// export default function FBLogin(){};