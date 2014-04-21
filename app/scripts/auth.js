define([
    'calendars/google-auth'
], function(
    googleAuth
) {
    var exports = {};

    // Public

    exports.isAuthenticated = function() {
        return googleAuth.isAuthenticated();
    };

    return exports;
});
