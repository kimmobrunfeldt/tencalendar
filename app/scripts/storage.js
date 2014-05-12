define([
], function (
) {
    if (!window.localStorage) {
        throw new Error('Localstorage is not supported');
    }

    var localStorage = window.localStorage;
    var exports = {};

    exports.save = function(key, data) {
        var value = JSON.stringify(data);
        return localStorage.setItem(key, value);
    };

    exports.remove = function(key) {
        return localStorage.removeItem(key);
    };

    exports.get = function(key) {
        var item = localStorage.getItem(key);
        return JSON.parse(item);
    };

    return exports;
});
