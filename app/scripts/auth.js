var _ = require('underscore');
var Q = require('q');

var utils = require('./utils');
var googleAuth = require('./calendars/google-auth');
var storage = require('./storage');

var exports = {};

exports.isAuthorized = function() {
    return !_.isNull(storage.get('auth'));
};

var getAuth = exports.getAuth = function() {
    return storage.get('auth');
};

var authorize = exports.authorize = function() {

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

if (getAuth()) {
    // When token is available, set token automatically
    authorize();
}

module.exports = exports;
