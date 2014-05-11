define([
    'underscore'
], function(
    _
) {
    var exports = {};

    exports.defaultParameter = function(value, defaultValue) {
        if (_.isUndefined(value)) {
            return defaultValue;
        }

        return value;
    };

    exports.alert = function(text) {
        return window.alert(text);
    };

    exports.confirm = function(text) {
        return window.confirm(text);
    };

    return exports;
});


