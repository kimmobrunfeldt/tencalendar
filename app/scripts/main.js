
function main() {
    initHello();
}

function initHello() {
    hello.init(
        {google: '535245779168.apps.googleusercontent.com'},
        {redirect_uri: 'redirect.html'}
    );

    hello.on('auth.login', userLoggedIn);

    $('#sign-in-with-google').click(function() {
        hello('google').login();
    });
}

function userLoggedIn(auth) {
    console.log('logged in')
    // call user information, for the given network
    hello(auth.network).api( '/me' ).success(function(r){
        var $target = $("body");
        if($target.length==0){
            $target = $("<div id='profile_"+auth.network+"'></div>").appendTo("#profile");
        }
        $target.html('<img src="'+ r.thumbnail +'" /> Hey '+r.name).attr('title', r.name + " on "+ auth.network);
    });
}

main();
