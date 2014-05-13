define([
    'q',
    'underscore',
    'gapi'
], function(
    Q,
    _,
    gapi
) {
    var exports = {};

    var clientId = '535245779168-t9kdscjdctqssscr2181bq97aqbdngok.apps.googleusercontent.com';
    var scopes = 'https://www.googleapis.com/auth/calendar';

    var authorize = exports.authorize = function(token) {
        var def = Q.defer();

        if (token) {
            gapi.auth.setToken({access_token: token});
            def.resolve();
            return def.promise;
        }

        gapi.auth.authorize({
            client_id: clientId,
            scope: scopes,
            immediate: false
        }, function handleAuthReponse(token) {
            if (_.has(token, 'error')) {
                console.log(token)
                def.reject({
                    error: token.error,
                });
            } else {
                def.resolve({
                    token: token.access_token,
                    expires: token.expires_in
                });
            }
        });

        return def.promise;
    };

    return exports;
});
