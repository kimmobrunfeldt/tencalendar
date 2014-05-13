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

    exports.isEventEnterPress = function(event) {
        if (!event) {
            event = window.event;
        }

        var keyCode = event.keyCode || event.which;
        return keyCode == '13';
    };

    exports.alert = function(text) {
        return window.alert(text);
    };

    exports.confirm = function(text) {
        return window.confirm(text);
    };

    return exports;
});


