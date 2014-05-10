define([
    'underscore',
    'q',
    'utils',
    'calendars/google-auth',
    'storage'
], function(
    _,
    Q,
    utils,
    googleAuth,
    storage
) {
    var exports = {};

    // Public

    exports.isAuthorized = function() {
        return !_.isNull(storage.get('auth'));
    };

    var getAuth = exports.getAuth = function() {
        return storage.get('auth');
    };

    exports.authorize = function() {

        var promise;
        var auth = getAuth();
        if (!auth) {
            promise = googleAuth.authorize();
        } else {
            promise = googleAuth.authorize(auth.token);
        }

        promise.done(function saveAuthToStorage(authData) {
            if (authData) {
                storage.save('auth', authData);
            }
        });

        return promise;
    };

    exports.unAuthorize = function() {
        storage.remove('auth');
    };

    return exports;
});
